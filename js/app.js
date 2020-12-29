const ePosDev = new epson.ePOSDevice();
const status = document.getElementById('status');
window.addEventListener('DOMContentLoaded', () => {
    console.log('html loaded');
    // connect();
    document.getElementById('ip').value = '192.168.0.161';
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
    let ip = document.getElementById('ip').value;
    if (ip.trim().length === 0) {
        alert('請輸入 ip');
    } else {
        var ipAddress = ip;
        var port = '8043';
        ePosDev.connect(ipAddress, port, callback_connect);
    }



}

async function callback_connect(resultConnect) {
    console.log('callback_connect called');
    var deviceId = 'local_printer';
    var options = { 'crypto': true, 'buffer': true };
    if ((resultConnect == 'OK') || (resultConnect == 'SSL_CONNECT_OK')) {
        console.log('connected');
        status.textContent = '已連接到印表機';
        //Retrieves the Printer object
        ePosDev.createDevice(deviceId, ePosDev.DEVICE_TYPE_PRINTER, options,
            callback_createDevice);
    }
    else {
        //Displays error messages
        status.textContent = '無法連接到印表機';
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
    printer.addCut(printer.CUT_FEED);

    console.log('print obj', deviceObj);
    createData(() => {
        send();
    });
    //Registers the print complete event
    printer.onreceive = function (response) {
        if (response.success) {
            //Displays the successful print message
            console.log('print success');
            status.textContent = '已出單';

        }
        else {
            console.error('print not scuuess');
            status.textContent = '列印失敗';

            //Displays error messages
        }
    };
}


function createData(callback) {
    printer.addTextLang('zh-tw');
    console.log('create print data');
    printer.addTextAlign(printer.ALIGN_CENTER);
    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');

    printer.addText('JM-PLUS\n');
    printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('小雞雞\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('小雞雞\n');
    // printer.addText('小雞雞\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('小雞雞\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('小雞雞\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('JM-PLUS\n');
    // printer.addText('Small GG\n');
    // printer.addText('小雞雞\n');
    // printer.addText('小雞雞\n');
    // printer.addText('Jason Lai 小雞雞\n');
    // printer.addText('小雞雞\n');
    // printer.addText('小雞雞\n');
    // printer.addText('小雞雞\n');
    // printer.addText('小雞雞\n');
    // printer.addText('小雞雞\n');


    callback();
}

function send() {
    console.log('send called');
    if (ePosDev.isConnected) {
        status.textContent = '列印中.......';

        console.log('ePosDev.isConnected , now printing');
        printer.send();
    } else {
        status.textContent = '無法列印，請重新連接';

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