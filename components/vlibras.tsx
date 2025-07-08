'use client'

import Vlibras from "vlibras-nextjs";

export default function VLibras() {
    return (
        <>
            {process.env.NODE_ENV === "production" && <Vlibras forceOnload />}
        </>
    )
}