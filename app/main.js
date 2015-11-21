var React = require('react');
var Hello = require('./component.jsx');

main();

function main() {
    React.render(<Hello/>, document.getElementById('app'));
}