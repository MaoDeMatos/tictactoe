import { FC } from "react";
import TsParticles, { IParticlesProps } from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import "twin.macro";

const Particles: FC<IParticlesProps> = ({ loaded }) => {
  const particlesInit = async (main: any) => {
    await loadStarsPreset(main);
  };

  return (
    <TsParticles
      tw="absolute inset-0 z-[-1]"
      id="tsparticles"
      init={particlesInit}
      loaded={loaded}
      options={{ preset: "stars" }}
    />
  );
};

export default Particles;
