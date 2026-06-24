'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { DOWN_PAYMENT_RATIOS, LOAN_YEARS, DEFAULT_RATE } from 'shared/constants'
import { calcMonthlyPayment, formatCurrency } from 'shared/utils'

export default function CalculatorPage() {
  const t = useTranslations()
  const [totalPrice, setTotalPrice] = useState('3000000')
  const [downRatio, setDownRatio] = useState(30)
  const [years, setYears] = useState(30)
  const [rate, setRate] = useState(DEFAULT_RATE)
  const [result, setResult] = useState<ReturnType<typeof calcMonthlyPayment> | null>(null)

  const calculate = () => {
    const p = parseFloat(totalPrice)
    if (!p || p <= 0) return
    const r = calcMonthlyPayment(p, downRatio, years, parseFloat(rate))
    setResult(r)
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <span className="page-header-icon">🏠</span>
        <h1 className="page-header-title">{t('calculator.title')}</h1>
        <p className="page-header-desc">{t('calculator.desc')}</p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="content-card p-6 sm:p-8">
          {/* Total Price */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('calculator.totalPrice')}</p>
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-lg font-semibold text-gray-400 mr-2">¥</span>
              <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)}
                className="w-full bg-transparent text-lg font-semibold text-gray-900 outline-none" />
            </div>
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('calculator.downPayment')}</p>
            <div className="flex gap-2 flex-wrap">
              {DOWN_PAYMENT_RATIOS.map((r) => (
                <button key={r} onClick={() => setDownRatio(r)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    downRatio === r ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>{r}%</button>
              ))}
            </div>
          </div>

          {/* Loan Term */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('calculator.loanTerm')}</p>
            <div className="flex gap-2 flex-wrap">
              {LOAN_YEARS.map((y) => (
                <button key={y} onClick={() => setYears(y)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    years === y ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>{y}{t('calculator.year')}</button>
              ))}
            </div>
          </div>

          {/* Rate */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('calculator.rate')}</p>
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
              <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)}
                className="w-full bg-transparent text-lg font-semibold text-gray-900 outline-none" placeholder="3.95" />
              <span className="text-sm text-gray-400">%</span>
            </div>
          </div>

          <button onClick={calculate} className="btn-primary mt-2">{t('calculator.calculate')}</button>
        </div>

        {result && (
          <div className="content-card p-6 mt-5 animate-fade-in">
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500">{t('calculator.monthlyPayment')}</span>
              <span className="text-2xl font-bold text-indigo-600">{formatCurrency(result.monthly, 'zh-CN')}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500">{t('calculator.totalInterest')}</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(result.totalInterest, 'zh-CN')}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500">{t('calculator.totalPayment')}</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(result.totalPayment, 'zh-CN')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
