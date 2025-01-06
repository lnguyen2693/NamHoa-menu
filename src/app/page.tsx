"use client";

import { useRouter } from "next/navigation";

// TODO(lnguye2693) - Write landing page

export default function Home() {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.push("/admin")}>
        Nhân viên
      </button>
      <button type="button" onClick={() => router.push("/menu")}>
        Menu (không order)
      </button>
      <button type="button" onClick={() => router.push("/menu?table=2")}>
        Khách hàng (order)
      </button>
    </>
  );
}
