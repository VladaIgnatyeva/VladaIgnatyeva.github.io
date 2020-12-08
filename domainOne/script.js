//import * as Sender from './Sender';
// const { Sender } = require('./Sender.js');

class Sender {

    constructor(iframe) {
        this.iframe = iframe;
        this.domain = window.location.href;
        // window.addEventListener("message", this.listener.bind(this));
    }

    postMessage(message) {
        this.iframe.postMessage(message, this.domain);
    }

    addData(data) {
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

    /*listener(event) {
        debugger;
        if (event.data) {
            let p = document.createElement('p');
            p.innerText = JSON.parse(event.data);
            document.body.appendChild(p);
        }
    }*/
}


(function () {
    const iframe_ = document.getElementById('ifr');
    const iframe = iframe_.contentWindow;

    // iframe.addEventListener("load", function () {
    // 
    iframe_.onload = () => {
       // debugger;
        const sender = new Sender(iframe);
        sender.addData({ 'test': 'test value' });
        sender.addData({ 'test1': 'test value1' });
        sender.readData('test');
        sender.readData('test22');
        sender.deleteData('test');
        sender.readData('test');
    }
    // });
}());