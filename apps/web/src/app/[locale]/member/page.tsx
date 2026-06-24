'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { VIP_PLANS } from 'shared/constants'

const benefits = [
  { key: 'unlimitedDesc', icon: '♾️' },
  { key: 'fastDesc', icon: '⚡' },
  { key: 'hdProcessDesc', icon: '🎨' },
  { key: 'newFirstDesc', icon: '🆕' },
]

export default function MemberPage() {
  const t = useTranslations()
  const [selected, setSelected] = useState('year')
  const [showModal, setShowModal] = useState(false)
  const [payMethod, setPayMethod] = useState('wechat')
  const [payStatus, setPayStatus] = useState<'idle' | 'processing' | 'success'>('idle')

  const plan = VIP_PLANS.find((p) => p.id === selected) || VIP_PLANS[1]
  const featuresKey = plan.featuresKey // e.g. 'member.featuresYear'
  const featureCount = plan.id === 'year' ? 5 : 4
  const features: string[] = []
  for (let i = 1; i <= featureCount; i++) {
    const val = t(`${featuresKey}${i}`)
    if (val !== featuresKey + i) features.push(val)
  }

  const handlePay = () => {
    setShowModal(true)
    setPayStatus('idle')
  }

  const confirmPay = () => {
    setPayStatus('processing')
    setTimeout(() => setPayStatus('success'), 3000)
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white py-16 sm:py-20">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">👑</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{t('member.heroTitle')}</h1>
          <p className="text-gray-300 max-w-md mx-auto">{t('member.heroDesc')}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VIP_PLANS.map((planItem) => {
            const isSelected = selected === planItem.id
            const planFeatures: string[] = []
            const featCount = planItem.id === 'year' ? 5 : 4
            for (let fi = 1; fi <= featCount; fi++) {
              const key = `${planItem.id === 'year' ? 'member.featuresYear' : 'member.featuresMonth'}${fi}`
              planFeatures.push(t(key))
            }
            return (
              <div
                key={planItem.id}
                onClick={() => setSelected(planItem.id)}
                className={`relative bg-white rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-200 ${
                  isSelected ? 'border-indigo-400 shadow-lg shadow-indigo-100' : 'border-gray-100 hover:border-gray-200'
                } ${planItem.recommended ? 'scale-[1.02]' : ''}`}
              >
                {planItem.recommended && (
                  <div className="absolute -top-0 -right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-tr-2xl rounded-bl-2xl">
                    {t('member.bestDeal')}
                  </div>
                )}
                <h3 className="text-gray-500 text-sm font-medium mb-3">{t(planItem.nameKey)}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-amber-500">¥</span>
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight">{planItem.price}</span>
                  <span className="text-gray-400 text-sm">/{t(planItem.periodKey)}</span>
                </div>
                {planItem.original && (
                  <p className="text-sm text-gray-400 line-through mb-5">¥{planItem.original}</p>
                )}
                <div className="h-px bg-gray-100 my-5" />
                <ul className="space-y-3 mb-6">
                  {planFeatures.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-indigo-500 font-bold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(planItem.id) }}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  {isSelected ? t('member.selected') : t('member.select')}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{t('member.vipBenefits')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div key={b.key} className="content-card p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">{b.icon}</div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5 capitalize">{b.key.replace('Desc', '').replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-sm text-gray-500">{t('member.' + b.key)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pay button */}
      <section className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <button onClick={handlePay} className="btn-primary">
          {t('member.payNow', { price: plan.price })}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">{t('member.payNow').replace(/¥\{price\}/g, '')}</p>
      </section>

      {/* Pay Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
             onClick={() => payStatus !== 'processing' && setShowModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 sm:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {payStatus === 'idle' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{t('member.confirmPay')}</h3>
                  <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600">✕</button>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">{t('member.payNow').split('·')[0].trim()}</p>
                  <p className="text-4xl font-extrabold text-gray-900">¥{plan.price}</p>
                </div>
                <div className="flex gap-3 mb-6">
                  <button onClick={() => setPayMethod('wechat')}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${payMethod === 'wechat' ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600'}`}>
                    💚 {t('member.wechatPay')}
                  </button>
                  <button onClick={() => setPayMethod('alipay')}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${payMethod === 'alipay' ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600'}`}>
                    💙 {t('member.alipay')}
                  </button>
                </div>
                <button onClick={confirmPay} className="btn-primary">{t('member.confirmPay')} ¥{plan.price}</button>
                <button onClick={() => setShowModal(false)} className="w-full mt-2 py-3 text-sm text-gray-400 hover:text-gray-600">{t('member.cancel')}</button>
              </>
            )}

            {payStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-900 font-semibold">{t('member.processing')}</p>
              </div>
            )}

            {payStatus === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-green-500">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('member.paySuccess')}</h3>
                <p className="text-sm text-gray-500 mb-6">{t('paySuccess.desc')}</p>
                <button onClick={() => { setShowModal(false); window.location.href = window.location.pathname.replace(/\/member$/, '/') }}
                  className="btn-primary">{t('paySuccess.startUsing')}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
