// ========================================
// TELEGOLD — TELEGRAM WEB INTERFACE
// ========================================


// ========================================
// CHAT MA'LUMOTLARI
// ========================================

const chats = [

    {
        id: 1,
        name: "Jadra Akramjanova",
        username: "@jadra_dev",
        avatar: "AJ",
        status: "onlayn",
        message: "Yangi loyihani ko‘rdingmi?",
        time: "14:25",
        unread: 3,

        messages: [
            {
                type: "incoming",
                text: "Salom! 👋",
                time: "14:20"
            },
            {
                type: "incoming",
                text: "Yangi loyihani ko‘rdingmi?",
                time: "14:21"
            },
            {
                type: "outgoing",
                text: "Ha, juda zo‘r chiqibdi 🔥",
                time: "14:22"
            },
            {
                type: "incoming",
                text: "Rahmat! 🚀",
                time: "14:25"
            }
        ]
    },


    {
        id: 2,
        name: "Sardor Dev",
        username: "@sardor_dev",
        avatar: "SD",
        status: "oxirgi marta yaqinda",
        message: "Bugun uchrashamizmi?",
        time: "13:40",
        unread: 1,

        messages: [
            {
                type: "incoming",
                text: "Bugun uchrashamizmi?",
                time: "13:40"
            }
        ]
    },


    {
        id: 3,
        name: "Madina UI",
        username: "@madina_ui",
        avatar: "MU",
        status: "onlayn",
        message: "Dizayn tayyor 🎨",
        time: "12:18",
        unread: 0,

        messages: [
            {
                type: "incoming",
                text: "Dizayn tayyor 🎨",
                time: "12:18"
            }
        ]
    },


    {
        id: 4,
        name: "IT O‘zbekiston",
        username: "@it_uz",
        avatar: "IT",
        status: "12 450 a'zo",
        message: "Yangi maqola joylandi",
        time: "11:05",
        unread: 8,

        messages: [
            {
                type: "incoming",
                text: "🚀 Yangi IT maqola joylandi!",
                time: "11:05"
            }
        ]
    },


    {
        id: 5,
        name: "Frontend UZ",
        username: "@frontend_uz",
        avatar: "FE",
        status: "8 923 a'zo",
        message: "JavaScript yangiliklari",
        time: "Kecha",
        unread: 0,

        messages: [
            {
                type: "incoming",
                text: "JavaScript yangiliklari ⚡",
                time: "Kecha"
            }
        ]
    },


    {
        id: 6,
        name: "Akmal Code",
        username: "@akmal_code",
        avatar: "AC",
        status: "oxirgi marta 5 daqiqa oldin",
        message: "Kod yubordim",
        time: "Kecha",
        unread: 0,

        messages: [
            {
                type: "incoming",
                text: "Kod yubordim 💻",
                time: "Kecha"
            }
        ]
    }

];


// ========================================
// LOCAL STORAGE
// ========================================

const savedChats =
    localStorage.getItem("telegoldChats");


if (savedChats) {

    try {

        const parsed =
            JSON.parse(savedChats);

        parsed.forEach(savedChat => {

            const current =
                chats.find(c => c.id === savedChat.id);

            if (current) {

                current.messages =
                    savedChat.messages;
            }

        });

    } catch (error) {

        console.log("Saqlangan ma'lumot o'qilmadi.");

    }
}


// ========================================
// ELEMENTLAR
// ========================================

const chatList =
    document.getElementById("chatList");

const messages =
    document.getElementById("messages");

const searchInput =
    document.getElementById("searchInput");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const emojiBtn =
    document.getElementById("emojiBtn");

const emojiPanel =
    document.getElementById("emojiPanel");

const attachBtn =
    document.getElementById("attachBtn");

const fileInput =
    document.getElementById("fileInput");

const profileBtn =
    document.getElementById("profileBtn");

const profilePanel =
    document.getElementById("profilePanel");

const menuBtn =
    document.getElementById("menuBtn");

const menuOverlay =
    document.getElementById("menuOverlay");

const closeMenu =
    document.getElementById("closeMenu");


// ========================================
// AKTIV CHAT
// ========================================

let activeChatId = 1;


// ========================================
// CHATLARNI CHIQARISH
// ========================================

function renderChats(list = chats) {

    chatList.innerHTML = "";


    list.forEach(chat => {

        const item =
            document.createElement("div");


        item.className =
            "chat-item";


        if (chat.id === activeChatId) {

            item.classList.add("active");
        }


        item.innerHTML = `

            <div class="avatar">
                ${chat.avatar}
            </div>

            <div class="chat-info">

                <div class="chat-top">

                    <span class="chat-name">
                        ${chat.name}
                    </span>

                    <span class="chat-time">
                        ${chat.time}
                    </span>

                </div>


                <div class="chat-bottom">

                    <span class="chat-message">
                        ${chat.message}
                    </span>

                    ${
                        chat.unread > 0

                        ? `
                            <span class="unread">
                                ${chat.unread}
                            </span>
                        `

                        : ""
                    }

                </div>

            </div>
        `;


        item.addEventListener(
            "click",
            () => selectChat(chat.id)
        );


        chatList.appendChild(item);

    });

}


// ========================================
// CHAT TANLASH
// ========================================

function selectChat(id) {

    activeChatId = id;


    const chat =
        chats.find(item => item.id === id);


    if (!chat) return;


    chat.unread = 0;


    document.getElementById(
        "headerAvatar"
    ).innerText = chat.avatar;


    document.getElementById(
        "headerName"
    ).innerText = chat.name;


    document.getElementById(
        "headerStatus"
    ).innerText = chat.status;


    renderMessages();


    renderChats();


    saveChats();


    messageInput.focus();
}


// ========================================
// XABARLARNI CHIQARISH
// ========================================

function renderMessages() {

    const chat =
        chats.find(item => item.id === activeChatId);


    if (!chat) return;


    messages.innerHTML = "";


    const date =
        document.createElement("div");


    date.className =
        "date-label";


    date.innerText =
        "Bugun";


    messages.appendChild(date);


    chat.messages.forEach(msg => {

        const wrapper =
            document.createElement("div");


        wrapper.className =
            `message ${msg.type}`;


        wrapper.innerHTML = `

            <div class="message-content">

                ${escapeHTML(msg.text)}

                <span class="message-time">
                    ${msg.time}
                </span>

            </div>

        `;


        messages.appendChild(wrapper);

    });


    scrollMessages();
}


// ========================================
// HTML XAVFSIZLIK
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ========================================
// XABAR YUBORISH
// ========================================

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) return;


    const chat =
        chats.find(item => item.id === activeChatId);


    if (!chat) return;


    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "uz-UZ",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    chat.messages.push({

        type: "outgoing",

        text: text,

        time: time
    });


    chat.message =
        text;


    chat.time =
        time;


    messageInput.value = "";


    renderMessages();

    renderChats();

    saveChats();


    // Demo avtomatik javob

    fakeReply(chat);
}


// ========================================
// DEMO JAVOB
// ========================================

function fakeReply(chat) {

    if (chat.id === 4 ||
        chat.id === 5) {

        return;
    }


    setTimeout(() => {

        const replies = [

            "Zo‘r! 🔥",

            "Albatta 😎",

            "Ha, tushunarli!",

            "Juda yaxshi 🚀",

            "Keyinroq batafsil gaplashamiz.",

            "Mayli 👍"
        ];


        const random =
            replies[
                Math.floor(
                    Math.random() *
                    replies.length
                )
            ];


        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                "uz-UZ",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        chat.messages.push({

            type: "incoming",

            text: random,

            time: time

        });


        chat.message =
            random;


        chat.time =
            time;


        renderMessages();

        renderChats();

        saveChats();

    }, 1200);

}


// ========================================
// ENTER ORQALI YUBORISH
// ========================================

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


sendBtn.addEventListener(
    "click",
    sendMessage
);


// ========================================
// EMOJI
// ========================================

emojiBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        emojiPanel.classList.toggle("show");

    }
);


document
    .querySelectorAll(".emoji-panel button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                messageInput.value +=
                    button.innerText;

                messageInput.focus();

            }
        );

    });


document.addEventListener(
    "click",
    event => {

        if (
            !emojiPanel.contains(event.target) &&
            event.target !== emojiBtn
        ) {

            emojiPanel.classList.remove("show");
        }

    }
);


// ========================================
// FAYL
// ========================================

attachBtn.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


fileInput.addEventListener(
    "change",
    () => {

        const file =
            fileInput.files[0];


        if (!file) return;


        const chat =
            chats.find(
                item => item.id === activeChatId
            );


        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                "uz-UZ",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        chat.messages.push({

            type: "outgoing",

            text:
                `📎 Fayl: ${file.name}`,

            time: time
        });


        chat.message =
            `📎 ${file.name}`;


        chat.time =
            time;


        renderMessages();

        renderChats();

        saveChats();


        fileInput.value = "";

    }
);


// ========================================
// QIDIRUV
// ========================================

searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!value) {

            renderChats();

            return;
        }


        const filtered =
            chats.filter(chat =>

                chat.name
                    .toLowerCase()
                    .includes(value)

                ||

                chat.username
                    .toLowerCase()
                    .includes(value)

                ||

                chat.message
                    .toLowerCase()
                    .includes(value)

            );


        renderChats(filtered);

    }
);


// ========================================
// CHAT ICHIDAGI QIDIRUV
// ========================================

document
    .getElementById("searchChatBtn")
    .addEventListener(
        "click",
        () => {

            const chat =
                chats.find(
                    item => item.id === activeChatId
                );


            if (!chat) return;


            const query =
                prompt(
                    "Xabarlardan qidiring:"
                );


            if (!query) return;


            const results =
                chat.messages.filter(
                    msg =>
                        msg.text
                            .toLowerCase()
                            .includes(
                                query.toLowerCase()
                            )
                );


            if (!results.length) {

                alert(
                    "Hech qanday xabar topilmadi."
                );

                return;
            }


            alert(
                `${results.length} ta xabar topildi.`
            );

        }
    );


// ========================================
// PROFIL
// ========================================

profileBtn.addEventListener(
    "click",
    () => {

        profilePanel.classList.toggle("show");

    }
);


// ========================================
// MENU
// ========================================

menuBtn.addEventListener(
    "click",
    () => {

        menuOverlay.classList.add("show");

    }
);


closeMenu.addEventListener(
    "click",
    () => {

        menuOverlay.classList.remove("show");

    }
);


menuOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === menuOverlay
        ) {

            menuOverlay.classList.remove(
                "show"
            );

        }

    }
);


// ========================================
// SAQLASH
// ========================================

function saveChats() {

    localStorage.setItem(
        "telegoldChats",
        JSON.stringify(chats)
    );

}


// ========================================
// SCROLL
// ========================================

function scrollMessages() {

    setTimeout(() => {

        messages.scrollTop =
            messages.scrollHeight;

    }, 50);

}


// ========================================
// ISHGA TUSHIRISH
// ========================================

renderChats();

selectChat(activeChatId);