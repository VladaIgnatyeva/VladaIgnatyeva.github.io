//import * as Sender from './Sender';
// const { Sender } = require('./Sender.js');

class Sender {

    constructor(iframe) {
        debugger;
        this.iframe = iframe;
        this.domain = window.location.href;
        // window.addEventListener("message", this.listener.bind(this));
    }

    postMessage(message) {
        debugger;
        this.iframe.postMessage(message, 'https://vladaignatyeva.github.io/domainTwo/');
    }

    addData(data) {
        //debugger;
        if (data) {
            debugger;
            let message = JSON.stringify({ 'add': data });
            this.postMessage(message);
        }
    }

    readData(key) {
        debugger;
        if (key) {
            let message = JSON.stringify({ 'read': key });
            this.postMessage(message);
        }
    }

    deleteData(key) {
        debugger;
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
    
    debugger;

    // iframe.addEventListener("load", function () {
    // 
    iframe.onload = () => {
        debugger;
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