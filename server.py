# biblioteki systemowe, framework cherrypy
import os
import cherrypy
import sys

# biblioteka websocket
from ws4py.server.cherrypyserver import WebSocketPlugin, WebSocketTool
from ws4py.websocket import WebSocket
from ws4py.messaging import TextMessage

# biblioteka do przetwarzania json
import simplejson

# dronekit implementacja dla pythona
from dronekit import connect
from dronekit.lib import VehicleMode, LocationGlobal

# zdefiniowanie lokalnej sciezki dla serwera
local_path = os.path.join(os.getcwd(), 'build/')

# zdefiniowanie sciezki, oraz otworzenie pliku html dla pliku index.html
index_path = os.path.join(local_path, 'index.html')
index_site = file(index_path, 'r').read()
print index_site

class QuadcopterWebSocketHandler(WebSocket):
    def received_message(self, message):
        cherrypy.engine.publish('websocket-broadcast', message)

    def closed(self, code, reason="Polaczenie z WebSocketem zostalo przerwane"):
        cherrypy.engine.publish('websocket-broadcast', TextMessage(reason))

class Quadcopter(object):
    def __init__(self, home_position):
        # podlaczenie sie do quadcoptera
        self.quadcopter = connect('127.0.0.1:14550', await_params=True)
        # ustawianie pol klasy quadcopter
        self.altitude = self.quadcopter.location.alt
        self.latitude = self.quadcopter.location.lat
        self.longtitude = self.quadcopter.location.lon
        self.battery_level = self.quadcopter.battery.level
        self.isArmed = self.quadcopter.armed
        self.mode = self.quadcopter.mode.name
        self.takeoff = self.quadcopter.commands.takeoff
        self.goto = self.quadcopter.commands.goto

        self.quadcopter.add_attribute_observer('armed', self.callback)

    @cherrypy.expose
    def index(self):
        return index_site % {'ws_address': 'ws://localhost:9000/ws'}

    @cherrypy.expose
    def ws(self):
        cherrypy.log("Handler stworzony: %s" % repr(cherrypy.request.ws_handler))

    @cherrypy.expose
    def arming(self):
        cherrypy.engine.publish('websocket-broadcast', str(self.quadcopter.location.alt))
        self.quadcopter.armed = True

    @cherrypy.expose
    def takingoff(self):
        self.quadcopter.mode = VehicleMode('GUIDED')
        if self.quadcopter.armed and self.altitude is not None:
            self.quadcopter.commands.takeoff(10)
        else:
            if self.quadcopter.armed:
                raise cherrypy.HTTPError(500, "Parametr uwzgledniajacy wysokosc nie zostal podany")
            else:
                raise cherrypy.HTTPError(500, "Quadcopter nie jest uzbrojony")

    # Callback for observer
    def callback(self, armed):
        data = simplejson.dumps({
            'altitude': self.quadcopter.location.alt,
            'longtitude': self.quadcopter.location.lon,
            'lattitude': self.quadcopter.location.lat,
            'armed': self.quadcopter.armed,
            'mode': self.quadcopter.mode.name,
            'batterylevel': self.quadcopter.battery.level,
            'pitch': self.quadcopter.attitude.pitch,
            'yaw': self.quadcopter.attitude.yaw,
            'roll': self.quadcopter.attitude.roll,
        }, separators=(',',':'))

        cherrypy.engine.publish('websocket-broadcast', data)

if __name__=='__main__':
    cherrypy.config.update({
        'server.socket_host': '0.0.0.0',
        'server.socket_port': 9000,
    })
    WebSocketPlugin(cherrypy.engine).subscribe()
    cherrypy.tools.websocket = WebSocketTool()
    cherrypy.quickstart(Quadcopter([54.52, 18.53]), '', config = {
        '/': {
            'tools.staticdir.root': local_path,
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [
                ('X-Frame-options', 'deny'),
                ('X-XSS-Protection', '1; mode=block'),
                ('X-Content-Type-Options', 'nosniff')
            ]
        },
        '/ws': {
            'tools.websocket.on': True,
            'tools.websocket.handler_cls': QuadcopterWebSocketHandler
        },
        '/extra': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "extra"
        },
        '/app': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "app"
        }
    })
