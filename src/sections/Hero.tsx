import Navigation from "@/components/Navigation";
import SagarLogo from "@/components/SagarLogo";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f9f6eb]">
      <div
        className="absolute inset-y-0 right-0 w-[30%] bg-[#12263a]"
        style={{
          boxShadow: "-28px 0 64px rgba(18, 38, 58, 0.55)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 pt-8">
        <SagarLogo
          textClassName={[
            "font-sekuya",
            "font-black",
            "text-[clamp(40px,6vw,88px)]",
            "leading-[1] tracking-[-0.01em]",
          ].join(" ")}
          className="text-black"
        />

        <div className="absolute bottom-8 right-0">
          <Navigation />
        </div>
      </div>
    </section>
  );
}

