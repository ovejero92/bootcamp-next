import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export const dynamic = 'force-dynamic';

export async function GET() {
    if (!db) {
        return NextResponse.json({ message: "Firebase no configurado" }, { status: 503 });
    }
    const data = collection(db, 'usuarios');

    const querySnapshot = await getDocs(data)

    const docs = querySnapshot.docs.map(doc => doc.data())
    return NextResponse.json(docs)
}