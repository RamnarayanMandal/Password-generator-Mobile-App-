import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('password is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const scheme = useColorScheme();

  const generatePasswordString = (passwordLength:number) => {
    let characters = '';
    if (lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characters += '0123456789';
    if (symbol) characters += '!@#$%^&*()_+{}[]\\|:;"\'<>,.?/~`';

    setPassword(generatePassword(characters, passwordLength));
    setPasswordGenerated(true);
  };

  const generatePassword = (characters:string, passwordLength:number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbol(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={scheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={scheme === 'dark' ? styles.darkTitle : styles.lightTitle}>Password Generator</Text>
          <Text style={scheme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle}>Generate a secure password</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({ values, handleChange, handleSubmit, handleReset }) => (
              <>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={scheme === 'dark' ? styles.darkInputStyle : styles.lightInputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='EX. 8'
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text="Include Lowercase"
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                    isChecked={lowerCase}
                    style={styles.checkboxContainerStyle}
                    onPress={() => setLowerCase(!lowerCase)}
                  />
                  <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Include Uppercase"
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                    isChecked={upperCase}
                    style={styles.checkboxContainerStyle}
                    onPress={() => setUpperCase(!upperCase)}
                  />
                  <BouncyCheckbox
                    size={25}
                    fillColor="blue"
                    unfillColor="#FFFFFF"
                    text="Include Numbers"
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                    isChecked={numbers}
                    style={styles.checkboxContainerStyle}
                    onPress={() => setNumbers(!numbers)}
                  />
                  <BouncyCheckbox
                    size={25}
                    fillColor="yellow"
                    unfillColor="#FFFFFF"
                    text="Include Symbols"
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{ fontFamily: "JosefinSans-Regular" }}
                    isChecked={symbol}
                    style={styles.checkboxContainerStyle}
                    onPress={() => setSymbol(!symbol)}
                  />
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity style={scheme === 'dark' ? styles.darkButton : styles.lightButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={scheme === 'dark' ? styles.darkButton : styles.lightButton} onPress={resetPassword}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
                {isPasswordGenerated && (
                  <View style={styles.resultContainer}>
                    <Text style={scheme === 'dark'? styles.darkResultText : styles.lightResultText}>Your generated password copy text</Text>

                    <Text selectable={true} style={scheme === 'dark' ? styles.darkResultText : styles.lightResultText}>{password}</Text>
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  darkTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  lightTitle: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  darkSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  lightSubtitle: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  darkInputStyle: {
    height: 50,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#ffffff',
  },
  lightInputStyle: {
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#000000',
  },
  checkboxContainer: {
    marginBottom: 20,
    
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkButton: {
    backgroundColor: '#444444',
    padding: 15,
    borderRadius: 10,
  },
  lightButton: {
    backgroundColor: '#eeeeee',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#007bff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  darkResultText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lightResultText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkboxContainerStyle: {
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
});
