

A modern **Scientific Calculator App built with React Native CLI**.
This Project provides a clean calculator interface with basic arithmetic operations, scientific calculations, and voice-based answer pronunciation.

---

## 📱 Features

### 🔢 Basic Calculator

* Addition `+`
* Subtraction `−`
* Multiplication `×`
* Division `÷`
* Percentage `%`
* Decimal calculations
* `00` input
* Clear / All Clear `AC`
* Backspace / Delete `⌫`
* Continuous calculations
* Proper handling of calculated results

### 🔬 Scientific Calculator

SmartCalc-RN includes a dedicated Scientific Mode that replaces the basic keypad with a scientific calculator interface.

Supported functions include:

* Sine `sin`
* Cosine `cos`
* Tangent `tan`
* Inverse Sine `asin`
* Inverse Cosine `acos`
* Inverse Tangent `atan`
* Square Root `√`
* Square `x²`
* Logarithm `log`
* Natural Logarithm `ln`
* Factorial `x!`
* Pi `π`
* Euler's Number `e`

### 📐 Angle Modes

Trigonometric calculations support:

* Degree `DEG`
* Radian `RAD`

The angle mode can be switched directly from the scientific calculator.

### 🔊 Voice Output

SmartCalc-RN includes a voice feature that reads the calculated answer aloud.

Example:

25
 ↓
🔊
 ↓
"The answer is 25"


This feature is implemented using **React Native TTS**.

### 🔄 Basic / Scientific Mode

The calculator has a dedicated mode-switching button.

BASIC
   ↕
SCIENTIFIC


Pressing `SCI` switches the entire calculator into Scientific Mode.

Pressing `BASIC` returns to the normal calculator.

This keeps the interface clean instead of trying to display every scientific button at the same time.

---


## 🛠️ Technologies Used

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| React Native          | Mobile application framework |
| TypeScript            | Application development      |
| React Native CLI      | Project/build environment    |
| Android SDK           | Android development          |
| Gradle                | Android build system         |
| React Native TTS      | Voice output                 |
| JavaScript/TypeScript | Calculator logic             |

---

## 📂 Project Structure


CalculatorApp/
│
├── android/
│   └── Android native project
│
├── src/
│   ├── components/
│   │   └── CalculatorButton.tsx
│   │
│   └── utils/
│       ├── calculator.ts
│       └── scientificCalculator.ts
│
├── App.tsx
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
└── README.md
```


# 🚀 Installation

## Prerequisites

Before running the project, make sure you have installed:

* Node.js
* Java JDK 17
* Android Studio
* Android SDK
* Android SDK Platform Tools
* React Native development environment

You can verify Node.js:


node --version


Verify Java:


java -version


Verify ADB:


adb --version


---

# 📥 Clone the Repository


git clone https://github.com/YOUR_USERNAME/SmartCalc-RN.git

Move into the project directory:


cd SmartCalc-RN


---

# 📦 Install Dependencies

Run:


npm install


This installs all required project dependencies.

---

# ▶️ Run the Application

## Option 1 — Android Emulator

Start your Android emulator and run:


npm run android


or:


npx react-native run-android


---

## Option 2 — Physical Android Device

Enable **Developer Options** and **USB Debugging** on your Android device.

Connect the device through USB and verify:


adb devices

Your device should appear in the list.

Then run:


npm run android

The application will be installed and launched on the connected Android device.

---

# 🔊 Text-to-Speech

This Project uses:

react-native-tts


When the speaker button is pressed, the current result is converted into speech.

For example:


Calculation:

10 + 15

Result:

25

Speaker:

🔊 → "The answer is 25"

---



# 🎯 Project Objectives

The main objectives of This Project are:

1. Develop a functional calculator using React Native.
2. Implement basic arithmetic operations.
3. Implement scientific mathematical functions.
4. Provide Degree and Radian angle modes.
5. Create reusable React Native components.
6. Implement voice-based result output.
7. Provide a responsive and user-friendly interface.
8. Demonstrate mobile application development using React Native CLI.

---

# 🧠 Architecture

The application follows a simple modular architecture:


                    SmartCalc-RN
                         │
             ┌───────────┴───────────┐
             │                       │
        App.tsx                 Utility Layer
             │                       │
       ┌─────┴─────┐          ┌──────┴──────┐
       │           │          │             │
     Basic     Scientific   calculator.ts  scientificCalculator.ts
     Mode        Mode
       │           │
       └─────┬─────┘
             │
      CalculatorButton
             │
        User Interface
             │
        React Native



# 📱 Platform

Currently designed for:

text
Android
IOS



# 👨‍💻 Author

**Ahmed Raza**

Software Engineering Student

Built using:


React Native + TypeScript


---

# 📄 License

This project was developed as an educational/university project.

You are welcome to study and modify the source code for learning purposes.

---

## ⭐ Acknowledgements

* React Native
* Android SDK
* React Native Community
* React Native TTS



---

### ⭐ If you found this project useful

Consider giving the repository a ⭐ on GitHub!
