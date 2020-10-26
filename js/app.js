const ePosDev = new epson.ePOSDevice();

window.addEventListener('DOMContentLoaded', () => {
    console.log('html loaded');
    connect();

});


function connect() {
    console.log('connect called');
    var ipAddress = '192.168.2.158';
    var port = '8043';
    ePosDev.connect(ipAddress, port, callback_connect);
}

function callback_connect(resultConnect) {
    console.log('callback_connect called');
    var deviceId = 'local_printer';
    var options = { 'crypto': false, 'buffer': false };
    if ((resultConnect == 'OK') || (resultConnect == 'SSL_CONNECT_OK')) {
        //Retrieves the Printer object
        ePosDev.createDevice(deviceId, ePosDev.DEVICE_TYPE_PRINTER, options,
            callback_createDevice);
    }
    else {
        //Displays error messages
    }
}

var printer = null;
function callback_createDevice(deviceObj, errorCode) {
    if (deviceObj === null) {
        //Displays an error message if the system fails to retrieve the Printer object
        return;
    }
    printer = deviceObj;
    //Registers the print complete event
    printer.onreceive = function (response) {
        if (response.success) {
            //Displays the successful print message
        }
        else {
            //Displays error messages
        }
    };
}


function createData() {
    printer.addTextAlign(printer.ALIGN_CENTER);
    printer.addText('JM-PLUS\n');
}

function send() {
    if (ePosDev.isConnected) {
        printer.send();
    }
}

//Discards the Printer object
ePosDev.deleteDevice(printer, callback_deleteDevice);
function callback_deleteDevice(errorCode) {
    //Terminates connection with device
    ePosDev.disconnect();
}