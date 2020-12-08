// import './Receiver';

class Receiver {

    constructor(domain) {
        this.domain = domain;
        window.addEventListener("message", this.listener.bind(this));
    }

    listener(event) {
        debugger;
        if (event.origin !== this.domain)
            return;

        if (event.data) {
            const message = JSON.parse(event.data),
                state = Object.keys(message)[0],
                messageBody = message[state];

            let key,
                value,
                callback,
                check;

            switch (state) {
                case 'add':
                    key = Object.keys(messageBody)[0];
                    value = messageBody[key];
                    localStorage[key] = JSON.stringify(value);

                    callback = `written: ${key} : ${value}`;
                    console.log(callback);
                    event.source.postMessage(JSON.stringify(callback), event.origin);
                    break;

                case 'read':
                    check = localStorage[messageBody];
                    check ? value = JSON.parse(check) : value = undefined;

                    value ?
                        callback = `read: ${messageBody} : ${value}` :
                        callback = `record "${messageBody}" not found`;
                    console.log(callback);
                    event.source.postMessage(JSON.stringify(callback), event.origin);
                    break;

                case 'delete':
                    check = localStorage[messageBody];
                    if (check) {
                        localStorage.removeItem(messageBody);

                        callback = `removed: "${messageBody}"`;
                    } else {
                        callback = `record "${messageBody}" not found`;
                    }
                    console.log(callback);
                    event.source.postMessage(JSON.stringify(callback), event.origin);
            }
        }
    }
}

let receiver = new Receiver('https://vladaignatyeva.github.io/domainTwo/');