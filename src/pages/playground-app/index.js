import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import {initPlayground} from '@site/src/lib/playground/main';
import styles from './index.module.css';

export default function PlaygroundAppPage() {
  const mountRef = useRef(null);

  useEffect(() => {
    initPlayground(mountRef.current).catch((error) => {
      console.error('Failed to initialize playground page', error);
    });
  }, []);

  return (
    <Layout
      title="SDK Playground"
      description="Standalone SPECTER SDK playground hosted inside the docs site.">
      <main className={styles.page}>
        <div className={styles.mountShell}>
          <div
            ref={mountRef}
            id="specter-sdk-playground-root"
            className={styles.mountPoint}
          />
        </div>
      </main>
    </Layout>
  );
}
