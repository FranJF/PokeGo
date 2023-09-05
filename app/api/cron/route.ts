import { NextResponse } from 'next/server'
import { ClientV2 } from '@/database/client-v2'


export async function GET() {
    await syncClientV2();
    return NextResponse.json({ ok: true });
}

async function syncClientV2() {
    const client = await ClientV2.connect();
    const db = client.db('pokego');

    const collection = db.collection('shinys');
    const urlShinys = "https://pogoapi.net/api/v1/shiny_pokemon.json";
    let shinys: any = null
    await fetch(urlShinys).then((res) => res.json()).then((data) => (shinys = data));
    shinys = Object.values(shinys);
    collection.insertMany(shinys);

}
