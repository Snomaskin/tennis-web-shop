import { FadeInOut } from "../utilComponents/FadeInOut";


export const MatchPredictor = () => (
  <FadeInOut style={{ width: '100vw', height: '100vh' }} duration={0.8}>
    <iframe
      src="fake-endpoint"
      title="Prediction App"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  </FadeInOut>
);