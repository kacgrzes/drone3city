# biblioteki systemowe, framework cherrypy
import os
import cherrypy
import threading

# biblioteka websocket
from ws4py.server.cherrypyserver import WebSocketPlugin, WebSocketTool
from ws4py.websocket import WebSocket
from ws4py.messaging import TextMessage

# biblioteka do przetwarzania json
import simplejson

# dronekit implementacja dla pythona
from dronekit import connect
from dronekit.lib import VehicleMode, LocationGlobal

# zdefiniowanie lokalnej sciezki dla plikow statycznych
local_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'build')

# zdefiniowanie sciezki, oraz otworzenie pliku html dla pliku index.html
index_path = os.path.join(local_path, 'index.html')
print local_path

index_site = file(index_path, 'r').read()
print index_site


# # Connecting to the Quadcopter
print 'Connecting to quadcopter in progress...'
quadcopter = connect('127.0.0.1:14550', wait_ready=True)

# Wyzwalanie WebSocketa
def ws_trigger():
        threading.Timer(1, ws_trigger).start()
        data = simplejson.dumps({
            'altitude': quadcopter.location.global_relative_frame.alt,
            'longtitude': quadcopter.location.global_relative_frame.lon,
            'lattitude': quadcopter.location.global_relative_frame.lat,
            'armed': quadcopter.armed,
            'mode': quadcopter.mode.name,
            'batterylevel': quadcopter.battery.level,
            'pitch': quadcopter.attitude.pitch,
            'yaw': quadcopter.attitude.yaw,
            'roll': quadcopter.attitude.roll,
        }, separators=(',',':'))
        cherrypy.engine.publish('websocket-broadcast', data)



class QuadcopterWebSocketHandler(WebSocket):
    def received_message(self, message):
        cherrypy.engine.publish('websocket-broadcast', message)

    def closed(self, code, reason="Polaczenie z WebSocketem zostalo przerwane"):
        cherrypy.engine.publish('websocket-broadcast', TextMessage(reason))


class Quadcopter(object):
    def __init__(self, home_position): #dodac potem home position
        print 'Connected to the quadcopter'

    @cherrypy.expose
    def index(self):
        return index_site % {'ws_address': 'ws://localhost:9000/ws'}

    @cherrypy.expose
    def ws(self):
        cherrypy.log("Handler stworzony: %s" % repr(cherrypy.request.ws_handler))

    @cherrypy.expose
    def arming(self):
        quadcopter.armed = True

    ws_trigger()

    @cherrypy.expose
    def takingoff(self):
        quadcopter.mode = VehicleMode('GUIDED')
        if quadcopter.armed and quadcopter.location.global_frame.alt is not None:
            quadcopter.simple_takeoff(10)
        else:
            if quadcopter.armed:
                raise cherrypy.HTTPError(500, "Parametr uwzgledniajacy wysokosc nie zostal podany")
            else:
                raise cherrypy.HTTPError(500, "Quadcopter nie jest uzbrojony")

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
            ],
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "./"
        },
        '/ws': {
            'tools.websocket.on': True,
            'tools.websocket.handler_cls': QuadcopterWebSocketHandler
        },
        '/extra': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "./extra"
        }
    })