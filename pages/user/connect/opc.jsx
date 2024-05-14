import React, { useState, useEffect } from "react";
//import { OPCUAClient } from "node-opcua-client";

function Page() {
    const [data, setData] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Memuat...");
/*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const client = OPCUAClient.create({
                    endpoint_must_exist: false
                });
                setConnectionStatus("Mencoba terhubung...");
                await client.connect(
                    "opc.tcp://localhost:4334/UA/MyLittleServer"
                );
                setConnectionStatus("Terhubung");
                const session = await client.createSession();
                const dataValue =
                    await session.readVariableValue("ns=1;s=temperature");
                setData(dataValue.value.value);
                await session.close();
                await client.disconnect();
            } catch (error) {
                console.error(error);
                setConnectionStatus("Gagal terhubung");
            }
        };

        fetchData();
    }, []);
*/
    return (
        <div>
            {/*<p>Status Koneksi: {connectionStatus}</p>*/}
            {/*<p>{data ? `Suhu: ${data}°C` : "Memuat data suhu..."}</p>*/}
        </div>
    );
}
export default Page;
