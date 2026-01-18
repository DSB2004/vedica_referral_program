import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import { ContextSection } from "@/components/home/context";
import { ProgramSection } from "@/components/home/program";
import { ProcessSection } from "@/components/home/process";
import { IncentivesSection } from "@/components/home/incentives";
import { Benefits } from "@/components/home/benefits";
import { WhoShouldApply } from "@/components/home/whoShouldApply";
import Footer from "@/components/home/footer";
export default function page() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <ContextSection></ContextSection>
      <ProgramSection></ProgramSection>

      <ProcessSection></ProcessSection>
      <Benefits></Benefits>
      <WhoShouldApply></WhoShouldApply>
      <IncentivesSection></IncentivesSection>
      <Footer></Footer>
    </>
  );
}
