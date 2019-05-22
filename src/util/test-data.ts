import { ChatMessage, MessageTag } from "@/structs/chat-message";
import { Activator, ResponseHandler } from '@/structs/response-handler';

const MESSAGES = [
    new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
    ),
    new ChatMessage('{"result":true, "count":42}', new Date(), [
        new MessageTag("automated", "green")
    ]),
    new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
    ),
    new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
    ),
    new ChatMessage(
        '{"widget": { "debug": "on", "window": { "title": "Sample Konfabulator Widget", "name": "main_window", "width": 500, "height": 500 }, "image": { "src": "Images/Sun.png", "name": "sun1", "hOffset": 250, "vOffset": 250, "alignment": "center" }, "text": { "data": "Click Here", "size": 36, "style": "bold", "name": "text1", "hOffset": 250, "vOffset": 100, "alignment": "center", "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;" } }}',
        new Date(),
        [new MessageTag("automated", "green")]
    ),
    new ChatMessage(
        "xasxsaxwdswdswda ddadwdawddawda sx<x<<<<<sssssssssssssqweefefe",
        new Date(),
        [new MessageTag("automated", "green")]
    ),
    new ChatMessage(
        '{"menu": { "id": 11111,"enabled": true, "value": "File", "popup": { "menuitem": [ {"value": "New", "onclick": "CreateNewDoc()"}, {"value": "Open", "onclick": "OpenDoc()"}, {"value": "Close", "onclick": "CloseDoc()"} ] } }}',
        new Date(),
        [new MessageTag("automated", "green")]
    )
];

const ACTIVATORS = [
    new Activator(
        "test1",
        new RegExp(".*"),
        new ResponseHandler()
    ),
    new Activator(
        "test2",
        new RegExp(".*"),
        new ResponseHandler()
    ),
    new Activator(
        "test3",
        new RegExp(".*"),
        new ResponseHandler()
    ),
    new Activator(
        "test4",
        new RegExp(".*"),
        new ResponseHandler()
    ),
    new Activator(
        "test5",
        new RegExp(".*"),
        new ResponseHandler()
    ),
    new Activator(
        "test6",
        new RegExp(".*"),
        new ResponseHandler()
    ),
];

export { MESSAGES, ACTIVATORS }