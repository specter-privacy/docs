import React, {useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// LottiePlayer renders a Lottie JSON animation. It only mounts in the browser
// (lottie-web touches `window`), and fetches the animation data at runtime so
// nothing extra is pulled into the server bundle.
function Player({src, loop = true, autoplay = true, size = 120, className}) {
  // require here, inside BrowserOnly, keeps lottie-react out of SSR.
  const Lottie = require('lottie-react').default;
  const resolved = useBaseUrl(src);
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(resolved)
      .then((r) => r.json())
      .then((json) => {
        if (active) setData(json);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [resolved]);

  // A real block box with explicit dimensions. Inline elements ignore
  // width/height, which is why the animation needs a div, not a span.
  const style = {width: size, height: size, display: 'block'};

  if (!data) {
    return <div className={styles.placeholder} style={style} aria-hidden="true" />;
  }

  return (
    <div className={className} style={style}>
      <Lottie animationData={data} loop={loop} autoplay={autoplay} style={{width: '100%', height: '100%'}} />
    </div>
  );
}

export default function LottiePlayer(props) {
  const size = props.size ?? 120;
  const style = {width: size, height: size, display: 'block'};
  return (
    <BrowserOnly fallback={<div className={styles.placeholder} style={style} />}>
      {() => <Player {...props} />}
    </BrowserOnly>
  );
}
