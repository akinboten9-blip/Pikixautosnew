"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinanceCalculatorProps {
  vehiclePrice: number;
}

export default function FinanceCalculator({ vehiclePrice }: FinanceCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState(Math.round(vehiclePrice * 0.1));
  const [interestRate, setInterestRate] = useState(12.5);
  const [loanTerm, setLoanTerm] = useState(48);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const currentLoanAmount = vehiclePrice - downPayment;
    setLoanAmount(currentLoanAmount);

    if (currentLoanAmount > 0 && interestRate > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const payment =
        (currentLoanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -loanTerm));
      setMonthlyPayment(payment);
    } else if (currentLoanAmount <= 0) {
      setMonthlyPayment(0);
    }
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > vehiclePrice) value = vehiclePrice;
    setDownPayment(value);
  };
  
  const handleInterestRateChange = (values: number[]) => {
    setInterestRate(values[0]);
  };
  
  const handleLoanTermChange = (values: number[]) => {
    setLoanTerm(values[0]);
  };

  return (
    <div className="space-y-6">
        <div className="text-center bg-secondary p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
            <p className="text-3xl font-bold text-primary">
                ${monthlyPayment > 0 ? monthlyPayment.toFixed(2) : '0.00'}
            </p>
        </div>

      <div className="space-y-2">
        <Label htmlFor="down-payment">Down Payment</Label>
        <Input
          id="down-payment"
          type="number"
          value={downPayment}
          onChange={handleDownPaymentChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Interest Rate: {interestRate.toFixed(1)}%</Label>
        <Slider
          defaultValue={[interestRate]}
          max={25}
          min={1}
          step={0.1}
          onValueChange={handleInterestRateChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Loan Term: {loanTerm} months</Label>
        <Slider
          defaultValue={[loanTerm]}
          max={84}
          min={12}
          step={12}
          onValueChange={handleLoanTermChange}
        />
      </div>
      
      <p className="text-xs text-muted-foreground text-center pt-2">
        This calculator is for estimation purposes only. Your actual payment may vary.
      </p>
    </div>
  );
}
