import { storageService } from "../../../services/storage-service.js"
import { utils } from '../../../lib/utils.js'
export const mailService = {
    query,
    getMailById,
    changeState,
    removeMail,
    checkStatus,
    submitCompose,
    changeSubject,
    filterReadUnread,
    setFavs,
    getFavsMails,
    getTrash,
    toggleState
}
var time = new Date(Date.now())
var trash = []
const KEY = 'EMAILS'
var gMails = [
    { id: utils.makeId(), subject: 'programing', body: 'Sale applies to select Fitbit products and accessories on Fitbit.‌com while supplies last. Offer ends December 23, 2020 at 11:59 pm PST. Purchase is limited to ten (10) Fitbit products. Exclusions apply. Cannot be combined with other discounts or applied after the order has been placed. Terms of offer are subject to change. Void where prohibitedOvernight shipping means one (1) business ', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'development', body: 'Humans aren’t perfectly objective judges. That’s not to say that C++ is objectively better than C, nor is it to say that C++ can do everything C can. The latter of which is untrue by the way. Modern C has a number of features C++ does not have, but the modern C fanboy will also be too often unable to point at what those features are, despite an overeager attitude to claim C is better.', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'politics', body: 'It may be used positively in the context of a "political solution" which is compromising and non-violent,[1] or descriptively as "the art or science of government", but also often carries a negative connotation.[2] For example, abolitionist Wendell Phillips declared that "we do not play politics; anti-slavery is no half-jest with us."[3] The concept has been defined in various ways, and ', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'corona-virus', body: 'Coronaviruses are a group of related RNA viruses that cause diseases in mammals and birds. In humans and birds, they cause respiratory tract infections that can range from mild to lethal. Mild illnesses in humans include some cases of the common cold (which is also caused by other viruses, predominantly rhinoviruses), while more lethal varieties can cause SARS, MERS, and COVID-19.  .', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'shit working', body: 'tore and/or access information on a device; Personalised ads display, personalised content, ad and content measurement, audience insights, and product development; Ensure security, prevent fraud, and debug; Technically deliver ads or content; Match and combine offline data sources; Link different devices; Receive and use automatically-sent device characteristics for identification .', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'javascript', body: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, MAScript standards are on yearly release cycles. This documentation refers to the latest We have put together a course that includes all the essential information you need to work towards your goal..', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'puki muki', body: 'This section is dedicated to the JavaScript language itself, and not the parts that are specific to Web pages or other host environments. For information about API specifics to Web pages, please see WeJavaScript is ECMAScript. As of 2012, all modern browsers fully support ECMAScript 5.1. Older browsers support at least ECMAScript 3. On June 17, 2015, ECMA International b APIs and DOM..', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'poko and momo', body: 'Continues our coverage of JavaScripts key fundamental features, turning our attention to commonly-encountered types of code blocks such as conditional statements, loops, functions, and events.. The object-oriented nature of JavaScript is important to understand if you want to go nt code, therefore. f the language and write more efficient code, therefore weve provided this module to help you.', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'finish with taht', body: 'JavaScript frameworks are an essential part of modern front-end web development, providing developers with proven tools for building scalable, interactive web applications. This module gives you some fundamental background knowledge about how client-side frameworks work and how they fit into your toolset, before moving on to tutorial series covering some of todays most popular ones. .', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'flex world', body: 'Browse JavaScripts feature history and implementation status  Edit JavaScript, CSS, HTML and get live results. Use external resources and collaborate with your team online.  Plunker is an online community for creating, collaborating on and sharing your web. , HTML files and get live results and file development ideas. Edit your JavaScript, CSS, nt debugging tooldasc abefore . e collaborative', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'asi grid world', body: 'To get started you have to define a container element as a grid with display: grid , set the column and row sizes with grid-template-columns and grid-template-rows , and hen place its child elements into the grid with grid-column and grid-row   grid CSS property is a shorthand property that sets all of the explicit and then it will work as you my think it work like in css just in flrx loum .', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'the best', body: ' 1989, American singer and songwriter Tina Turner released a cover version that became a highly successful single. It was included on her hit album Foreign Affair. The saxophone solo on Turners version is played by Edgar Winter.The song title is often colloquially mis-cited as Simply the Best, reflecting a phrase in the chorus. This became so commonplace that the  of some subsequent versions, and in.  .', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'the wors', body: 'From Einstein’s grave premonitions about what was to erupt in Europe, to Harry Truman’s sudden ascension to the presidency in the midst of World War II, to his justification of the atomic bombardment of Japan, this collection highlights the progression and dramatic moments of the war that shaped the greatest generationGen. Douglas MacArthur wades ashore during initial landings at Leyte, PhilippWorld War II', isRead: false, isFav: false, sentAt: time },
    { id: utils.makeId(), subject: 'the fuck is happend', body: 'expected to sign that measure, logistical complexities – it must be enrolled on parchment paper, physically delivered to the White House and reviewed by administration lawyers – prevented the bill from quickly getting to him. Separately, Trump signed a seven-day government spending bill, averting a federal shutdown. Tucked inside the spending bill was over $110 billion in tax breaks for  .', isRead: false, isFav: false, sentAt: time }
]

function query(name = '') {
    const storageMails = storageService.loadFromStorage(KEY)
    if (!storageMails || storageMails.length === 0) {
        const filterRegex = new RegExp(name, 'i');
        const mails = gMails.filter(mail => filterRegex.test(mail.subject))
        return mails
    } else {

        return gMails = storageMails
    }
}

function getMailById(id) {
    const currMail = gMails.find(mail => mail.id === id)
    return currMail
}

function changeState(id) {
    const currMail = getMailById(id)
    currMail.isRead = true
    storageService.saveToStorage(KEY, gMails)

}

function toggleState(id) {
    const currMail = getMailById(id)
    currMail.isRead = !currMail.isRead
    storageService.saveToStorage(KEY, gMails)

}

function removeMail(id) {
    const currMailIdx = gMails.findIndex(mail => mail.id === id)
    const trashMail = gMails.splice(currMailIdx, 1)[0]
    trash.unshift(trashMail)
    storageService.saveToStorage(KEY, gMails)
    return trash
}

function getTrash() {
    return trash
}

function checkStatus(mails) {
    const mailsRead = mails.filter(mail => mail.isRead)
    return mailsRead
}

function submitCompose(newMail) {
    const today = new Date(Date.now())
    const mail = { id: utils.makeId(), ...newMail, isRead: false, sentAt: today.toDateString() }
    gMails.unshift(mail)
    storageService.saveToStorage(KEY, gMails)
}

function changeSubject(id, value) {
    const mail = getMailById(id)
    mail.subject = value
    storageService.saveToStorage(KEY, gMails)

}

function filterReadUnread(value) {
    var isTrue;
    if (value === 'all') return gMails
    else if (value === 'read') isTrue = true
    else isTrue = false
    const readMails = gMails.filter(mail => mail.isRead === isTrue)
    storageService.saveToStorage(KEY, gMails)
    return readMails
}

function getFavsMails() {
    const favsMails = gMails.filter(mail => mail.isFav === true)
    storageService.saveToStorage(KEY, gMails)
    return favsMails

}

function setFavs(id) {
    const favsMail = gMails.find(mail => mail.id === id)
    favsMail.isFav = !favsMail.isFav
    storageService.saveToStorage(KEY, gMails)

}

function getFavsMails() {
    const favsMails = gMails.filter(mail => mail.isFav === true)
    storageService.saveToStorage(KEY, gMails)
    return favsMails
}