import { FC, FormEvent, useEffect, useRef, useState } from "react";
import env from "../configs/env.configs";

const { OTP_LENGTH } = env;

const OtpVerification: FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(120);
  useEffect(() => {
    if (!canResend && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [canResend, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResend = () => {
    if (!canResend) return;

    // TODO: Call resend OTP API here
    console.log("OTP resent");

    setCanResend(false);
    setTimer(120); // Restart 2-minute timer
  };

  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      if (value || (value === "" && index > 0)) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Submitted OTP:", enteredOtp);
  };

  return (
    <section className="bg-neutral-950 text-white">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="p-3 sm:p-8 sm:border sm:w-[400px] md:w-[500px] rounded-xl w-full ">
          <div>
            <h1 className="text-3xl font-extrabold">Verify your identity</h1>
            <p className="font-semibold mt-4">
              We’ve sent a one-time code to your email. Please enter it below to
              continue.
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between sm:justify-between w-full  items-center gap-2">
                {otp.map((digit, index) => (
                  <div key={index}>
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      autoFocus={index === 0}
                      autoComplete="one-time-code"
                      className="otp-input w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className=" mt-6">
                <button
                  type="submit"
                  className="w-full font-bold cursor-pointer px-8 rounded-[6px] py-2 bg-blue-500"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`transition-colors duration-200 font-medium px-4 py-1 rounded-md text-sm ${
                canResend
                  ? "text-blue-400 hover:text-blue-500 hover:bg-neutral-900"
                  : "text-gray-500 cursor-not-allowed bg-neutral-800"
              }`}
            >
              Resend OTP
            </button>
            {!canResend && (
              <p className="mt-2 text-xs text-gray-400 font-mono">
                Available in {formatTime(timer)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtpVerification;
