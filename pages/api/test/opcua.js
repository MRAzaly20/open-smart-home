// pages/api/opcua.js (Next.js 13)
import { OPCUAClient, AttributeIds, TimestampsToReturn } from "node-opcua";

export default async function handler(req, res) {
    // Konfigurasi klien OPC UA
    const client = OPCUAClient.create({ endpointMustExist: false });
    const endpointUrl = "opc.tcp://localhost:4840";
    const nodeId = "ns=2;i=6522";

    if (req.method === 'POST') {
        // Logika untuk menangani request POST
        try {
            await client.connect(endpointUrl);
            console.log("connected !");

            const session = await client.createSession();
            console.log("session created !");

            const browseResult = await session.browse("RootFolder");
            console.log("browse result:", browseResult);

            const dataValue = await session.read({
                nodeId,
                attributeId: AttributeIds.Value
            });
            console.log("read value:", dataValue.value.value);

            // ... tambahkan logika lainnya jika diperlukan ...
            const parsedValue = JSON.parse(JSON.stringify(dataValue));
            const statusCodeValue = parsedValue.statusCode.value;
            await session.close();
            await client.disconnect();

            res.status(200).json({ message: 'POST request berhasil diproses.',
            value: statusCodeValue });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        // Logika untuk menangani request GET
        res.status(200).json({ message: 'GET request berhasil diproses.' });
    } else {
        // Menangani metode HTTP lain atau mengembalikan error
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
