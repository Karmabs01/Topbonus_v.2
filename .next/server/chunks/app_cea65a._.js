module.exports = {

"[project]/app/utils/db.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// app/utils/db.ts
__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__commonjs__external__$40$prisma$2f$client__ = __turbopack_external_require__("@prisma/client", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
const prisma = global.prisma || new __TURBOPACK__commonjs__external__$40$prisma$2f$client__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) global.prisma = prisma;
const __TURBOPACK__default__export__ = prisma;

})()),
"[project]/app/api/verify-otp/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// app/api/verify-otp/route.ts
__turbopack_esm__({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/utils/db.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
// Функция для отправки события в Customer.io
async function sendCustomerIOEvent(customerId, email) {
    const siteId = process.env.CUSTOMERIO_GURU_SITE_ID;
    const apiKey = process.env.CUSTOMERIO_GURU_API_KEY;
    if (!siteId || !apiKey) {
        console.error('Customer.io credentials are not set in environment variables.');
        return;
    }
    const url = `https://track.customer.io/api/v1/customers/${encodeURIComponent(customerId)}/events`;
    const payload = {
        name: 'ppc_reg',
        data: {
            keyword: customerId,
            email: email
        }
    };
    const auth = Buffer.from(`${siteId}:${apiKey}`).toString('base64');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to send event to Customer.io: ${response.status} ${errorText}`);
        } else {
            console.log('Event ppc_reg successfully sent to Customer.io.');
        }
    } catch (error) {
        console.error('Error sending event to Customer.io:', error);
    }
}
async function POST(request) {
    try {
        const { otpId, otpCode, email } = await request.json();
        console.log('Received data:', {
            otpId,
            otpCode,
            email
        });
        const otpEntry = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].otps.findUnique({
            where: {
                id: otpId
            }
        });
        if (!otpEntry || otpEntry.email !== email || otpEntry.code !== otpCode) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Invalid OTP code or email.'
            }, {
                status: 400
            });
        }
        const currentTime = new Date();
        if (currentTime > new Date(otpEntry.expires_at)) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].otps.delete({
                where: {
                    id: otpId
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'OTP code has expired.'
            }, {
                status: 400
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].otps.delete({
            where: {
                id: otpId
            }
        });
        const usernamePart = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
        const randomDigits = Math.floor(1000000 + Math.random() * 9000000).toString();
        const login = `${usernamePart}_${randomDigits}`;
        const id = `${usernamePart}_${randomDigits}_ppc1_1224`;
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].users.findUnique({
            where: {
                id
            }
        });
        if (existingUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'User ID collision. Please try again.'
            }, {
                status: 500
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].users.create({
            data: {
                login,
                id,
                VIP: "",
                balance: 0.0,
                country: 'N/A',
                input: "",
                password: "",
                tickets: '50',
                winbalance: "",
                customer: 'GURU',
                status_payment: "",
                phone_number: "",
                spins_waiting: "",
                geo_approve: "",
                leads: "",
                sales: "",
                qr_code: ""
            }
        });
        // Отправка события в Customer.io после успешного создания пользователя
        await sendCustomerIOEvent(id, email);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'OTP verified and user created.'
        });
    } catch (error) {
        console.error('Error verifying OTP or creating user:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'Failed to verify OTP or create user.'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=app_cea65a._.js.map