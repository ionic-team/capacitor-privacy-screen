import { IonButton, IonToggle, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { useState, useEffect } from 'react';
import { PrivacyScreen, PrivacyScreenConfig } from '@capacitor/privacy-screen';
import { Device } from '@ionic-enterprise/identity-vault';
import './PrivacyScreenContainer.css';
import { Capacitor } from '@capacitor/core';

interface ContainerProps { }

const PrivacyScreenContainer: React.FC<ContainerProps> = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [dimBackground, setDimBackground] = useState<boolean>(false);
  const [privacyModeOnActivityHidden, setPrivacyModeOnActivityHidden] = useState<'none' | 'dim' | 'splash'>('none');
  const [preventScreenshots, setPreventScreenshots] = useState<boolean>(false);
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
  }, [preventScreenshots, dimBackground, blurEffect, privacyModeOnActivityHidden]);

  const checkPrivacyScreenStatus = async () => {
    const { enabled } = await PrivacyScreen.isEnabled();
    setIsEnabled(enabled);
  };

  const handleEnable = async () => {
    const config: PrivacyScreenConfig = {
      android: {
        dimBackground,
        preventScreenshots,
        privacyModeOnActivityHidden
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

  const showBiometricPrompt = async () => {
    try {
      await Device.showBiometricPrompt({});
      console.log('Biometric authentication successful');
    } catch (error) {
      console.log('Biometric authentication failed or was cancelled', error);
    }
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
          <>
            <IonItem>
              <IonLabel>Dim Background (Android)</IonLabel>
              <IonToggle 
                checked={dimBackground}
                onIonChange={e => setDimBackground(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Prevent Screenshots (Android)</IonLabel>
              <IonToggle 
                checked={preventScreenshots}
                onIonChange={e => setPreventScreenshots(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Privacy Mode on Activity Hidden (Android)</IonLabel>
              <IonSelect 
                value={privacyModeOnActivityHidden}
                onIonChange={e => setPrivacyModeOnActivityHidden(e.detail.value)}
              >
                <IonSelectOption value="none">None</IonSelectOption>
                <IonSelectOption value="dim">Dim</IonSelectOption>
                <IonSelectOption value="splash">Splash</IonSelectOption>
              </IonSelect>
            </IonItem>
          </>
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

        <IonButton 
          expand="block"
          color="tertiary"
          onClick={showBiometricPrompt}
        >
          Test Biometric Prompt
        </IonButton>
      </div>
    </div>
  );
};

export default PrivacyScreenContainer;