import { Container } from "@mantine/core";
import { MyHeader } from "../Header/Header";
import { Bottom } from "./Bottom/Bottom";
import { ExamDetailDemo } from "./ExamDetailDemo/ExamDetailDemo";
import { FeaturesGrid } from "./Feature/Feature";
import { Footer } from "./Footer/Footer";
import { HeroTitle } from "./HeroTitle/HeroTitle";

export const Landing = () => {
  return (
    <>
      <MyHeader
        opened={false}
        toggleSide={() => {}}
        setPrimaryColor={() => {}}
        noMenu
      />
      <HeroTitle />

      <Container>
        <FeaturesGrid />
        <ExamDetailDemo />
        <Bottom />
      </Container>

      <Footer />
    </>
  );
};
