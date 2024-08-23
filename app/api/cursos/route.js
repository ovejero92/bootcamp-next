import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import {db} from "@/firebase/config"

export async function GET() {
    const data = collection(db, "cursos");

    const querySnapshot = await getDocs(data);

    const docs = querySnapshot.docs.map(doc => doc.data())
    return NextResponse.json(docs)
}