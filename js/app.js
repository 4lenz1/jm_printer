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
            createData();
    }
    else {
        //Displays error messages
        console.log('callback_connect error');
    }
}

var printer = null;
function callback_createDevice(deviceObj, errorCode) {
    console.log('callback_createDevice called');
    if (deviceObj === null) {
        console.log('deviceObj is null , error', errorCode);
        //Displays an error message if the system fails to retrieve the Printer object
        return;
    }
    printer = deviceObj;
    //Registers the print complete event
    printer.onreceive = function (response) {
        if (response.success) {
            console.log('print success');
            //Displays the successful print message
        }
        else {
            console.log('error on   printer.onreceive ');
            //Displays error messages
        }
    };
}


function createData() {
    printer.addTextAlign(printer.ALIGN_CENTER);
    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');

    printer.addText('JM-PLUS\n');

    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');
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
    console.log('callback_deleteDevice called');
    //Terminates connection with device
    ePosDev.disconnect();
    console.log('disconnect with invoice printer');
}