//import * as Sender from './Sender';
// const { Sender } = require('./Sender.js');

class Sender {

    constructor(iframe) {
        this.iframe = iframe;
        this.domain = window.location.href;
        window.addEventListener("message", this.listener.bind(this));
    }

    postMessage(message) {
        this.iframe.postMessage(message, this.domain);
    }

    addData(data) {
        //debugger;
        if (data) {
            let message = JSON.stringify({ 'add': data });
            this.postMessage(message);
        }
    }

    readData(key) {
        if (key) {
            let message = JSON.stringify({ 'read': key });
            this.postMessage(message);
        }
    }

    deleteData(key) {
        if (key) {
            let message = JSON.stringify({ 'delete': key });
            this.postMessage(message);
        }
    }

    listener(event) {
        if (event.data) {
            let p = document.createElement('p');
            p.innerText = JSON.parse(event.data);
            document.body.appendChild(p);
        }
    }
}


(function () {
    const iframe = document.getElementById('ifr').contentWindow;
    const sender = new Sender(iframe);
    debugger;
    window.onload = () => {

        sender.addData({ 'test': 'test value' });
        sender.addData({ 'test1': 'test value1' });
        sender.readData('test');
        sender.readData('test22');
        sender.deleteData('test');
        sender.readData('test');
    }

}());