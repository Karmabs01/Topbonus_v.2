module.exports = {

"[project]/app/utils/mailer.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// app/utils/mailer.ts
__turbopack_esm__({
    "sendEmail": ()=>sendEmail
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
const sendEmail = async (to, subject, text)=>{
    console.log(`Trying send email to ${to} with theme "${subject}"`);
    const mailOptions = {
        from: '"Topbonus" <admin@topbonus.com>',
        to,
        subject,
        text
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
        console.log('Info for letter:', info);
    } catch (error) {
        console.error(`Error sendding to ${to}:`, error);
        throw error;
    }
};

})()),
"[project]/knexfile.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// /knexfile.ts
__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].config({
    path: '.env.local'
});
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        },
        migrations: {
            directory: './migrations'
        }
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        },
        migrations: {
            directory: './migrations'
        }
    }
};
const __TURBOPACK__default__export__ = config;

})()),
"[project]/app/utils/db.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// app/utils/db.ts
__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$knex$2f$knex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/knex/knex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$knexfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/knexfile.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const environment = ("TURBOPACK compile-time value", "development") || 'development';
const config = __TURBOPACK__imported__module__$5b$project$5d2f$knexfile$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"][environment];
// Используем глобальную переменную для предотвращения множественных подключений в режиме разработки
const db = global.knexInstance || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$knex$2f$knex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(config);
if ("TURBOPACK compile-time truthy", 1) {
    global.knexInstance = db;
}
const __TURBOPACK__default__export__ = db;

})()),
"[project]/app/api/send-otp/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// app/api/send-otp/route.ts
__turbopack_esm__({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$mailer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/utils/mailer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/utils/db.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
async function POST(request) {
    try {
        const { email } = await request.json();
        console.log(`Received OTP request for email: ${email}`);
        // Проверка email
        if (!email || typeof email !== 'string') {
            console.error('Invalid format:', email);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Invalid format'
            }, {
                status: 400
            });
        }
        // Генерация и сохранение OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр
        const otpId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])('otps10').insert({
            id: otpId,
            email,
            code: otpCode,
            expires_at: expiresAt
        });
        // Отправка OTP по электронной почте
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$mailer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, 'One-time code for topbon.us', `Your code for topbon.us: ${otpCode}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            otpId
        });
    } catch (error) {
        console.error('Error processing send-otp request:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'Failed to send OTP'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=_af9991._.js.map