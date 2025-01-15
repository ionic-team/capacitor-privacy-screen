import { IonButton, IonToggle, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { useState, useEffect } from 'react';
import { PrivacyScreen, PrivacyScreenConfig } from '@capacitor/privacy-screen';
import './PrivacyScreenContainer.css';
import { Capacitor } from '@capacitor/core';

interface ContainerProps { }

const PrivacyScreenContainer: React.FC<ContainerProps> = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [dimBackground, setDimBackground] = useState<boolean>(false);
  const [blurEffect, setBlurEffect] = useState<'none' | 'light' | 'dark'>('none');
  const [lastActionSuccess, setLastActionSuccess] = useState<boolean | null>(null);
  const isPlatformIOS = Capacitor.getPlatform() === 'ios';

  useEffect(() => {
    checkPrivacyScreenStatus();
  }, []);

  useEffect(() => {
    if (isEnabled) {
      handleEnable();
    }
  }, [dimBackground, blurEffect]);

  const checkPrivacyScreenStatus = async () => {
    const { enabled } = await PrivacyScreen.isEnabled();
    setIsEnabled(enabled);
  };

  const handleEnable = async () => {
    const config: PrivacyScreenConfig = {
      android: {
        dimBackground
      },
      ios: {
        blurEffect
      }
    };
    const { success } = await PrivacyScreen.enable(config);
    setLastActionSuccess(success);
    await checkPrivacyScreenStatus();
  };

  const handleDisable = async () => {
    const { success } = await PrivacyScreen.disable();
    setLastActionSuccess(success);
    await checkPrivacyScreenStatus();
  };

  return (
    <div id="container">
      <strong>Privacy Screen Test App</strong>
      
      <p>Current Status: 
        <span className={`status-badge ${isEnabled ? 'status-enabled' : 'status-disabled'}`}>
          {isEnabled ? 'ENABLED' : 'DISABLED'}
        </span>
      </p>

      {lastActionSuccess !== null && (
        <p>Last Action: 
          <span className={`status-badge ${lastActionSuccess ? 'status-enabled' : 'status-disabled'}`}>
            {lastActionSuccess ? 'SUCCESS' : 'FAILED'}
          </span>
        </p>
      )}

      <IonList>
        {!isPlatformIOS && (
          <IonItem>
            <IonLabel>Dim Background (Android)</IonLabel>
            <IonToggle 
              checked={dimBackground}
              onIonChange={e => setDimBackground(e.detail.checked)}
            />
          </IonItem>
        )}
        
        {isPlatformIOS && (
          <IonItem>
            <IonLabel>Blur Effect (iOS)</IonLabel>
            <IonSelect 
              value={blurEffect}
              onIonChange={e => setBlurEffect(e.detail.value)}
            >
              <IonSelectOption value="none">None (Splash Screen)</IonSelectOption>
              <IonSelectOption value="light">Light Blur</IonSelectOption>
              <IonSelectOption value="dark">Dark Blur</IonSelectOption>
            </IonSelect>
          </IonItem>
        )}
      </IonList>

      <div className="button-container">
        <IonButton 
          expand="block"
          onClick={handleEnable}
          disabled={isEnabled}
        >
          Enable Privacy Screen
        </IonButton>

        <IonButton 
          expand="block"
          color="danger"
          onClick={handleDisable}
          disabled={!isEnabled}
        >
          Disable Privacy Screen
        </IonButton>

        <IonButton 
          expand="block"
          color="secondary"
          onClick={checkPrivacyScreenStatus}
        >
          Refresh Status
        </IonButton>
      </div>
    </div>
  );
};

export default PrivacyScreenContainer;