
class Sender {

    constructor(iframe) {
        this.iframe = iframe;
        this.domain = window.location.href;
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

}

(function () {
    const iframe_ = document.getElementById('ifr');
    const iframe = iframe_.contentWindow;

    iframe_.onload = () => {
        const sender = new Sender(iframe);
        sender.addData({ 'test': 'test value' });
        sender.addData({ 'test1': 'test value1' });
        sender.readData('test');
        sender.readData('test22');
        sender.deleteData('test');
        sender.readData('test');
    }
}());