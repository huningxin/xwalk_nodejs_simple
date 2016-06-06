var fsDiv = document.getElementById('fs');
var usbDiv = document.getElementById('usb');
var serialportDiv = document.getElementById('serialport');
var fs = require('fs');
var path = './';
fs.readdir(path, function(err, items) {
    //console.log(items);
 
 	var fileList = '';
    for (var i=0; i<items.length; i++) {
        //console.log(items[i]);
        fileList = fileList + items[i] + '<br>';
    }
    fsDiv.innerHTML = fileList;
});

var usb = require('usb');
var list = usb.getDeviceList();
var usbDeivcesList = '';
for (var i = 0; i < list.length; i++) {
	var device = list[i];
	//console.log(device.busNumber);
	//console.log(device.deviceAddress);
	//console.log(device.deviceDescriptor.idProduct);
	//console.log(device.deviceDescriptor.idVendor);
	usbDeivcesList = usbDeivcesList + 'Bus&nbsp;' + device.busNumber;
    usbDeivcesList = usbDeivcesList + '&nbsp;Device&nbsp;' + device.deviceAddress;
    usbDeivcesList = usbDeivcesList + '&nbsp;ID&nbsp;' +
                     device.deviceDescriptor.idProduct.toString(16) + ':' + device.deviceDescriptor.idVendor.toString(16) + '<br>';
}
usbDiv.innerHTML = usbDeivcesList;

var serialPorts;
var serialPort = require('serialport');
serialPort.list(function (err, ports) {
  var serialDeviceList = '';
  serialPorts = ports;
  for (var i = ports.length - 1; i >= 0; --i) {
  	//console.log(i);
  	port = ports[i];
    //console.log(port.comName);
    //console.log(port.pnpId);
    //console.log(port.manufacturer);
    serialDeviceList = serialDeviceList + port.comName + '&nbsp;';
    serialDeviceList = serialDeviceList + '&nbsp;pnpID:&nbsp;' + port.pnpId;
    serialDeviceList = serialDeviceList + '&nbsp;manufacturer:&nbsp;' + port.manufacturer + '<br>';
  }
  serialportDiv.innerHTML = serialDeviceList;
});

process.on('exit', (code) => {
  console.log('About to exit with code:', code);
});
