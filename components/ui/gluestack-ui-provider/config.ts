'use client';
import {vars} from 'nativewind';

export const config = {
  light: vars({
    /* Primary - 主色调：自然绿色 */
    '--color-primary-0': '236 253 245',
    '--color-primary-50': '209 250 229',
    '--color-primary-100': '167 243 208',
    '--color-primary-200': '110 231 183',
    '--color-primary-300': '52 211 153',
    '--color-primary-400': '34 197 94',
    '--color-primary-500': '16 185 129', // 主要绿色
    '--color-primary-600': '5 150 105',
    '--color-primary-700': '4 120 87',
    '--color-primary-800': '6 95 70',
    '--color-primary-900': '6 78 59',
    '--color-primary-950': '2 44 34',

    /* Secondary - 次要色调：温暖棕色 */
    '--color-secondary-0': '255 251 235',
    '--color-secondary-50': '254 243 199',
    '--color-secondary-100': '253 230 138',
    '--color-secondary-200': '252 211 77',
    '--color-secondary-300': '251 191 36',
    '--color-secondary-400': '245 158 11',
    '--color-secondary-500': '217 119 6', // 主要棕色
    '--color-secondary-600': '180 83 9',
    '--color-secondary-700': '146 64 14',
    '--color-secondary-800': '120 53 15',
    '--color-secondary-900': '87 37 12',
    '--color-secondary-950': '69 26 3',

    /* Tertiary - 第三色调：天空蓝 */
    '--color-tertiary-0': '239 246 255',
    '--color-tertiary-50': '219 234 254',
    '--color-tertiary-100': '191 219 254',
    '--color-tertiary-200': '147 197 253',
    '--color-tertiary-300': '96 165 250',
    '--color-tertiary-400': '59 130 246',
    '--color-tertiary-500': '37 99 235', // 主要蓝色
    '--color-tertiary-600': '29 78 216',
    '--color-tertiary-700': '30 64 175',
    '--color-tertiary-800': '30 58 138',
    '--color-tertiary-900': '35 56 118',
    '--color-tertiary-950': '23 37 84',

    /* Error - 错误色：保持红色但调整明度 */
    '--color-error-0': '254 242 242',
    '--color-error-50': '254 226 226',
    '--color-error-100': '254 202 202',
    '--color-error-200': '252 165 165',
    '--color-error-300': '248 113 113',
    '--color-error-400': '239 68 68',
    '--color-error-500': '220 38 38', // 主要错误色
    '--color-error-600': '185 28 28',
    '--color-error-700': '153 27 27',
    '--color-error-800': '127 29 29',
    '--color-error-900': '101 32 32',
    '--color-error-950': '69 19 19',

    /* Success - 成功色：使用更自然的绿色 */
    '--color-success-0': '236 253 245',
    '--color-success-50': '209 250 229',
    '--color-success-100': '167 243 208',
    '--color-success-200': '110 231 183',
    '--color-success-300': '52 211 153',
    '--color-success-400': '34 197 94',
    '--color-success-500': '16 185 129', // 主要成功色
    '--color-success-600': '5 150 105',
    '--color-success-700': '4 120 87',
    '--color-success-800': '6 95 70',
    '--color-success-900': '6 78 59',
    '--color-success-950': '2 44 34',

    /* Warning - 警告色：使用温暖的橙色 */
    '--color-warning-0': '255 251 235',
    '--color-warning-50': '254 243 199',
    '--color-warning-100': '253 230 138',
    '--color-warning-200': '252 211 77',
    '--color-warning-300': '251 191 36',
    '--color-warning-400': '245 158 11',
    '--color-warning-500': '217 119 6', // 主要警告色
    '--color-warning-600': '180 83 9',
    '--color-warning-700': '146 64 14',
    '--color-warning-800': '120 53 15',
    '--color-warning-900': '87 37 12',
    '--color-warning-950': '69 26 3',

    /* Info - 信息色：使用天空蓝 */
    '--color-info-0': '239 246 255',
    '--color-info-50': '219 234 254',
    '--color-info-100': '191 219 254',
    '--color-info-200': '147 197 253',
    '--color-info-300': '96 165 250',
    '--color-info-400': '59 130 246',
    '--color-info-500': '37 99 235', // 主要信息色
    '--color-info-600': '29 78 216',
    '--color-info-700': '30 64 175',
    '--color-info-800': '30 58 138',
    '--color-info-900': '35 56 118',
    '--color-info-950': '23 37 84',

    /* Typography - 文字颜色：使用深灰色系 */
    '--color-typography-0': '255 255 255',
    '--color-typography-50': '249 250 251',
    '--color-typography-100': '243 244 246',
    '--color-typography-200': '229 231 235',
    '--color-typography-300': '209 213 219',
    '--color-typography-400': '156 163 175',
    '--color-typography-500': '107 114 128', // 主要文字色
    '--color-typography-600': '75 85 99',
    '--color-typography-700': '55 65 81',
    '--color-typography-800': '31 41 55',
    '--color-typography-900': '17 24 39',
    '--color-typography-950': '8 8 11',

    /* Background - 背景色：使用柔和的灰白色 */
    '--color-background-0': '255 255 255',
    '--color-background-50': '249 250 251',
    '--color-background-100': '243 244 246',
    '--color-background-200': '229 231 235',
    '--color-background-300': '209 213 219',
    '--color-background-400': '156 163 175',
    '--color-background-500': '107 114 128',
    '--color-background-600': '75 85 99',
    '--color-background-700': '55 65 81',
    '--color-background-800': '31 41 55',
    '--color-background-900': '17 24 39',
    '--color-background-950': '8 8 11',

    /* Background Special - 特殊背景色 */
    '--color-background-error': '254 242 242',
    '--color-background-warning': '255 251 235',
    '--color-background-success': '236 253 245',
    '--color-background-muted': '243 244 246',
    '--color-background-info': '239 246 255',

    /* Border - 边框颜色：使用柔和的灰色 */
    '--color-border-0': '#FFFFFF',
    '--color-border-50': '#F9FAFB',
    '--color-border-100': '#F3F4F6',
    '--color-border-200': '#E5E7EB',
    '--color-border-300': '#D1D5DB',
    '--color-border-400': '#9CA3AF',
    '--color-border-500': '#6B7280',
    '--color-border-600': '#4B5563',
    '--color-border-700': '#374151',
    '--color-border-800': '#1F2937',
    '--color-border-900': '#111827',
    '--color-border-950': '#030712',

    /* Focus Ring Indicator - 焦点环指示器 */
    '--color-indicator-primary': '16 185 129', // 使用主色调
    '--color-indicator-info': '37 99 235', // 使用信息色
    '--color-indicator-error': '220 38 38', // 使用错误色
  }),
  dark: vars({
    '--color-primary-0': '166 166 166',
    '--color-primary-50': '175 175 175',
    '--color-primary-100': '186 186 186',
    '--color-primary-200': '197 197 197',
    '--color-primary-300': '212 212 212',
    '--color-primary-400': '221 221 221',
    '--color-primary-500': '230 230 230',
    '--color-primary-600': '240 240 240',
    '--color-primary-700': '250 250 250',
    '--color-primary-800': '253 253 253',
    '--color-primary-900': '254 249 249',
    '--color-primary-950': '253 252 252',

    /* Secondary  */
    '--color-secondary-0': '20 20 20',
    '--color-secondary-50': '23 23 23',
    '--color-secondary-100': '31 31 31',
    '--color-secondary-200': '39 39 39',
    '--color-secondary-300': '44 44 44',
    '--color-secondary-400': '56 57 57',
    '--color-secondary-500': '63 64 64',
    '--color-secondary-600': '86 86 86',
    '--color-secondary-700': '110 110 110',
    '--color-secondary-800': '135 135 135',
    '--color-secondary-900': '150 150 150',
    '--color-secondary-950': '164 164 164',

    /* Tertiary */
    '--color-tertiary-0': '84 49 18',
    '--color-tertiary-50': '108 61 19',
    '--color-tertiary-100': '130 73 23',
    '--color-tertiary-200': '180 98 26',
    '--color-tertiary-300': '215 117 31',
    '--color-tertiary-400': '231 129 40',
    '--color-tertiary-500': '251 157 75',
    '--color-tertiary-600': '253 180 116',
    '--color-tertiary-700': '254 209 170',
    '--color-tertiary-800': '255 233 213',
    '--color-tertiary-900': '255 242 229',
    '--color-tertiary-950': '255 250 245',

    /* Error */
    '--color-error-0': '83 19 19',
    '--color-error-50': '127 29 29',
    '--color-error-100': '153 27 27',
    '--color-error-200': '185 28 28',
    '--color-error-300': '220 38 38',
    '--color-error-400': '230 53 53',
    '--color-error-500': '239 68 68',
    '--color-error-600': '249 97 96',
    '--color-error-700': '229 91 90',
    '--color-error-800': '254 202 202',
    '--color-error-900': '254 226 226',
    '--color-error-950': '254 233 233',

    /* Success */
    '--color-success-0': '27 50 36',
    '--color-success-50': '20 83 45',
    '--color-success-100': '22 101 52',
    '--color-success-200': '32 111 62',
    '--color-success-300': '42 121 72',
    '--color-success-400': '52 131 82',
    '--color-success-500': '72 151 102',
    '--color-success-600': '102 181 132',
    '--color-success-700': '132 211 162',
    '--color-success-800': '162 241 192',
    '--color-success-900': '202 255 232',
    '--color-success-950': '228 255 244',

    /* Warning */
    '--color-warning-0': '84 45 18',
    '--color-warning-50': '108 56 19',
    '--color-warning-100': '130 68 23',
    '--color-warning-200': '180 90 26',
    '--color-warning-300': '215 108 31',
    '--color-warning-400': '231 120 40',
    '--color-warning-500': '251 149 75',
    '--color-warning-600': '253 173 116',
    '--color-warning-700': '254 205 170',
    '--color-warning-800': '255 231 213',
    '--color-warning-900': '255 244 237',
    '--color-warning-950': '255 249 245',

    /* Info */
    '--color-info-0': '3 38 56',
    '--color-info-50': '5 64 93',
    '--color-info-100': '7 90 131',
    '--color-info-200': '9 115 168',
    '--color-info-300': '11 141 205',
    '--color-info-400': '13 166 242',
    '--color-info-500': '50 180 244',
    '--color-info-600': '87 194 246',
    '--color-info-700': '124 207 248',
    '--color-info-800': '162 221 250',
    '--color-info-900': '199 235 252',
    '--color-info-950': '236 248 254',

    /* Typography */
    '--color-typography-0': '23 23 23',
    '--color-typography-50': '38 38 39',
    '--color-typography-100': '64 64 64',
    '--color-typography-200': '82 82 82',
    '--color-typography-300': '115 115 115',
    '--color-typography-400': '140 140 140',
    '--color-typography-500': '163 163 163',
    '--color-typography-600': '212 212 212',
    '--color-typography-700': '219 219 220',
    '--color-typography-800': '229 229 229',
    '--color-typography-900': '245 245 245',
    '--color-typography-950': '254 254 255',

    /* Outline */
    '--color-outline-0': '26 23 23',
    '--color-outline-50': '39 38 36',
    '--color-outline-100': '65 65 65',
    '--color-outline-200': '83 82 82',
    '--color-outline-300': '115 116 116',
    '--color-outline-400': '140 141 141',
    '--color-outline-500': '165 163 163',
    '--color-outline-600': '211 211 211',
    '--color-outline-700': '221 220 219',
    '--color-outline-800': '230 230 230',
    '--color-outline-900': '243 243 243',
    '--color-outline-950': '253 254 254',

    /* Background */
    '--color-background-0': '18 18 18',
    '--color-background-50': '39 38 37',
    '--color-background-100': '65 64 64',
    '--color-background-200': '83 82 82',
    '--color-background-300': '116 116 116',
    '--color-background-400': '142 142 142',
    '--color-background-500': '162 163 163',
    '--color-background-600': '213 212 212',
    '--color-background-700': '229 228 228',
    '--color-background-800': '242 241 241',
    '--color-background-900': '246 246 246',
    '--color-background-950': '255 255 255',

    /* Background Special */
    '--color-background-error': '66 43 43',
    '--color-background-warning': '65 47 35',
    '--color-background-success': '28 43 33',
    '--color-background-muted': '51 51 51',
    '--color-background-info': '26 40 46',

    /* Border */
    '--color-border-0': '#1A1717',
    '--color-border-50': '#272624',
    '--color-border-100': '#414141',
    '--color-border-200': '#535252',
    '--color-border-300': '#737474',
    '--color-border-400': '#8C8D8D',
    '--color-border-500': '#A5A3A3',
    '--color-border-600': '#D3D3D3',
    '--color-border-700': '#DDDCDB',
    '--color-border-800': '#E6E6E6',
    '--color-border-900': '#F3F3F3',
    '--color-border-950': '#FDFEFE',

    /* Focus Ring Indicator  */
    '--color-indicator-primary': '247 247 247',
    '--color-indicator-info': '161 199 245',
    '--color-indicator-error': '232 70 69',
  }),
};
