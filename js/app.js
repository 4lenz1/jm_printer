const ePosDev = new epson.ePOSDevice();

window.addEventListener('DOMContentLoaded', () => {
    console.log('html loaded');
    // connect();
    createBtn();
});

const root = document.getElementById('root');

function createBtn() {
    let btn = document.createElement('button');
    btn.id = 'connect';
    btn.innerText = 'connect printer';

    root.appendChild(btn);
}



window.addEventListener('click', (e) => {

    if (e.target.id === 'connect') {
        console.log('btn clicked', e.target.id);
        connect();
    }

});


function connect() {
    console.log('connect called');
    var ipAddress = '192.168.0.161';
    var port = '8043';
    ePosDev.connect(ipAddress, port, callback_connect)


}

async function callback_connect(resultConnect) {
    console.log('callback_connect called');
    var deviceId = 'local_printer';
    var options = { 'crypto': false, 'buffer': false };
    if ((resultConnect == 'OK') || (resultConnect == 'SSL_CONNECT_OK')) {
        console.log('connected');
        //Retrieves the Printer object
        ePosDev.createDevice(deviceId, ePosDev.DEVICE_TYPE_PRINTER, options,
            callback_createDevice);
    }
    else {
        //Displays error messages
        console.log('callback_connect error');
    }
}

var printer = null;
function callback_createDevice(deviceObj, errorCode) {
    if (deviceObj === null) {
        console.log(errorCode);
        console.log('deviceObj is null , failed ', errorCode);
        //Displays an error message if the system fails to retrieve the Printer object
        return;
    }
    printer = deviceObj;
    console.log('print obj', deviceObj);
    createData(()=>{
        send();
    });
    //Registers the print complete event
    printer.onreceive = function (response) {
        if (response.success) {

            //Displays the successful print message


            console.log('print success');
        }
        else {
            console.error('error');
            //Displays error messages
        }
    };
}


function createData(callback) {
    console.log('create print data');
    printer.addTextAlign(printer.ALIGN_CENTER);
    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');

    printer.addText('JM-PLUS\n');

    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');
    printer.addText('Small GG\n');
    callback();
}

function send() {
    console.log('send called');
    if (ePosDev.isConnected) {
        console.log('ePosDev.isConnected');
        printer.send();
    } else {
        console.warn('ePosDev.is not connected');
    }
}

//Discards the Printer object
// ePosDev.deleteDevice(printer, callback_deleteDevice);
function callback_deleteDevice(errorCode) {
    console.log('callback_deleteDevice called');
    //Terminates connection with device
    ePosDev.disconnect();
    console.log('disconnect with invoice printer');
}