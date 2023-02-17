import React, {useEffect} from "react";
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import PageLayout from "../../layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import DecorComponent from "../../components/DecorComponent";
import moment from "moment";
import {moneyFormat} from "../../ulti/helper";
import PhoneCode from 'react-phone-code';
import CheckoutForm from "../../components/form/CheckoutForm";

const Page = () => {
    const {checkOutItems, locale} = useAppContext();
    const {t} = useTranslation("common");

    console.log("Checkout", checkOutItems);

    const countryData = {
        VN: {
            name: 'Vietnam',
            code: '+84'
        },
        US: {
            name: 'United States',
            code: '+1'
        },
        KR: {
            name: 'South Korea',
            code: '+82'
        },
        CN: {
            name: 'China',
            code: '+86'
        },
        JP: {
            name: 'Japan',
            code: '+81'
        },
        RU: {
            name: 'Russia',
            code: '+7'
        },
        AF: {
            name: 'Afghanistan',
            code: '+93'
        },
        AL: {
            name: 'Albania',
            code: '+355'
        },
        DZ: {
            name: 'Algeria',
            code: '+213'
        },
        AS: {
            name: 'American Samoa',
            code: '+1-684'
        },
        AD: {
            name: 'Andorra',
            code: '+376'
        },
        AO: {
            name: 'Angola',
            code: '+244'
        },
        AI: {
            name: 'Anguilla',
            code: '+1-264'
        },
        AQ: {
            name: 'Antarctica',
            code: '+672'
        },
        AG: {
            name: 'Antigua and Barbuda',
            code: '+1-268'
        },
        AR: {
            name: 'Argentina',
            code: '+54'
        },
        AM: {
            name: 'Armenia',
            code: '+374'
        },
        AW: {
            name: 'Aruba',
            code: '+297'
        },
        AU: {
            name: 'Australia',
            code: '+61'
        },
        AT: {
            name: 'Austria',
            code: '+43'
        },
        AZ: {
            name: 'Azerbaijan',
            code: '+994'
        },
        BS: {
            name: 'Bahamas',
            code: '+1-242'
        },
        BH: {
            name: 'Bahrain',
            code: '+973'
        },
        BD: {
            name: 'Bangladesh',
            code: '+880'
        },
        BB: {
            name: 'Barbados',
            code: '+1-246'
        },
        BY: {
            name: 'Belarus',
            code: '+375'
        },
        BE: {
            name: 'Belgium',
            code: '+32'
        },
        BZ: {
            name: 'Belize',
            code: '+501'
        },
        BJ: {
            name: 'Benin',
            code: '+229'
        },
        BM: {
            name: 'Bermuda',
            code: '+1-441'
        },
        BT: {
            name: 'Bhutan',
            code: '+975'
        },
        BO: {
            name: 'Bolivia',
            code: '+591'
        },
        BA: {
            name: 'Bosnia and Herzegovina',
            code: '+387'
        },
        BW: {
            name: 'Botswana',
            code: '+267'
        },
        BR: {
            name: 'Brazil',
            code: '+55'
        },
        IO: {
            name: 'British Indian Ocean Territory',
            code: '+246'
        },
        VG: {
            name: 'British Virgin Islands',
            code: '+1-284'
        },
        BN: {
            name: 'Brunei',
            code: '+673'
        },
        BG: {
            name: 'Bulgaria',
            code: '+359'
        },
        BF: {
            name: 'Burkina Faso',
            code: '+226'
        },
        BI: {
            name: 'Burundi',
            code: '+257'
        },
        KH: {
            name: 'Cambodia',
            code: '+855'
        },
        CM: {
            name: 'Cameroon',
            code: '+237'
        },
        CA: {
            name: 'Canada',
            code: '+1'
        },
        CV: {
            name: 'Cape Verde',
            code: '+238'
        },
        KY: {
            name: 'Cayman Islands',
            code: '+1-345'
        },
        CF: {
            name: 'Central African Republic',
            code: '+236'
        },
        TD: {
            name: 'Chad',
            code: '+235'
        },
        CL: {
            name: 'Chile',
            code: '+56'
        },
        CX: {
            name: 'Christmas Island',
            code: '+61'
        },
        CC: {
            name: 'Cocos Islands',
            code: '+61'
        },
        CO: {
            name: 'Colombia',
            code: '+57'
        },
        KM: {
            name: 'Comoros',
            code: '+269'
        },
        CK: {
            name: 'Cook Islands',
            code: '+682'
        },
        CR: {
            name: 'Costa Rica',
            code: '+506'
        },
        HR: {
            name: 'Croatia',
            code: '+385'
        },
        CU: {
            name: 'Cuba',
            code: '+53'
        },
        CW: {
            name: 'Curacao',
            code: '+599'
        },
        CY: {
            name: 'Cyprus',
            code: '+357'
        },
        CZ: {
            name: 'Czech Republic',
            code: '+420'
        },
        CD: {
            name: 'Democratic Republic of the Congo',
            code: '+243'
        },
        DK: {
            name: 'Denmark',
            code: '+45'
        },
        DJ: {
            name: 'Djibouti',
            code: '+253'
        },
        DM: {
            name: 'Dominica',
            code: '+1-767'
        },
        DO: {
            name: 'Dominican Republic',
            code: '+1-809, 1-829, 1-849'
        },
        TL: {
            name: 'East Timor',
            code: '+670'
        },
        EC: {
            name: 'Ecuador',
            code: '+593'
        },
        EG: {
            name: 'Egypt',
            code: '+20'
        },
        SV: {
            name: 'El Salvador',
            code: '+503'
        },
        GQ: {
            name: 'Equatorial Guinea',
            code: '+240'
        },
        ER: {
            name: 'Eritrea',
            code: '+291'
        },
        EE: {
            name: 'Estonia',
            code: '+372'
        },
        ET: {
            name: 'Ethiopia',
            code: '+251'
        },
        FK: {
            name: 'Falkland Islands',
            code: '+500'
        },
        FO: {
            name: 'Faroe Islands',
            code: '+298'
        },
        FJ: {
            name: 'Fiji',
            code: '+679'
        },
        FI: {
            name: 'Finland',
            code: '+358'
        },
        FR: {
            name: 'France',
            code: '+33'
        },
        PF: {
            name: 'French Polynesia',
            code: '+689'
        },
        GA: {
            name: 'Gabon',
            code: '+241'
        },
        GM: {
            name: 'Gambia',
            code: '+220'
        },
        GE: {
            name: 'Georgia',
            code: '+995'
        },
        DE: {
            name: 'Germany',
            code: '+49'
        },
        GH: {
            name: 'Ghana',
            code: '+233'
        },
        GI: {
            name: 'Gibraltar',
            code: '+350'
        },
        GR: {
            name: 'Greece',
            code: '+30'
        },
        GL: {
            name: 'Greenland',
            code: '+299'
        },
        GD: {
            name: 'Grenada',
            code: '+1-473'
        },
        GU: {
            name: 'Guam',
            code: '+1-671'
        },
        GT: {
            name: 'Guatemala',
            code: '+502'
        },
        GG: {
            name: 'Guernsey',
            code: '+44-1481'
        },
        GN: {
            name: 'Guinea',
            code: '+224'
        },
        GW: {
            name: 'Guinea-Bissau',
            code: '+245'
        },
        GY: {
            name: 'Guyana',
            code: '+592'
        },
        HT: {
            name: 'Haiti',
            code: '+509'
        },
        HN: {
            name: 'Honduras',
            code: '+504'
        },
        HK: {
            name: 'Hong Kong',
            code: '+852'
        },
        HU: {
            name: 'Hungary',
            code: '+36'
        },
        IS: {
            name: 'Iceland',
            code: '+354'
        },
        IN: {
            name: 'India',
            code: '+91'
        },
        ID: {
            name: 'Indonesia',
            code: '+62'
        },
        IR: {
            name: 'Iran',
            code: '+98'
        },
        IQ: {
            name: 'Iraq',
            code: '+964'
        },
        IE: {
            name: 'Ireland',
            code: '+353'
        },
        IM: {
            name: 'Isle of Man',
            code: '+44-1624'
        },
        IL: {
            name: 'Israel',
            code: '+972'
        },
        IT: {
            name: 'Italy',
            code: '+39'
        },
        CI: {
            name: 'Ivory Coast',
            code: '+225'
        },
        JM: {
            name: 'Jamaica',
            code: '+1-876'
        },
        JE: {
            name: 'Jersey',
            code: '+44-1534'
        },
        JO: {
            name: 'Jordan',
            code: '+962'
        },
        KZ: {
            name: 'Kazakhstan',
            code: '+7'
        },
        KE: {
            name: 'Kenya',
            code: '+254'
        },
        KI: {
            name: 'Kiribati',
            code: '+686'
        },
        XK: {
            name: 'Kosovo',
            code: '+383'
        },
        KW: {
            name: 'Kuwait',
            code: '+965'
        },
        KG: {
            name: 'Kyrgyzstan',
            code: '+996'
        },
        LA: {
            name: 'Laos',
            code: '+856'
        },
        LV: {
            name: 'Latvia',
            code: '+371'
        },
        LB: {
            name: 'Lebanon',
            code: '+961'
        },
        LS: {
            name: 'Lesotho',
            code: '+266'
        },
        LR: {
            name: 'Liberia',
            code: '+231'
        },
        LY: {
            name: 'Libya',
            code: '+218'
        },
        LI: {
            name: 'Liechtenstein',
            code: '+423'
        },
        LT: {
            name: 'Lithuania',
            code: '+370'
        },
        LU: {
            name: 'Luxembourg',
            code: '+352'
        },
        MO: {
            name: 'Macau',
            code: '+853'
        },
        MK: {
            name: 'Macedonia',
            code: '+389'
        },
        MG: {
            name: 'Madagascar',
            code: '+261'
        },
        MW: {
            name: 'Malawi',
            code: '+265'
        },
        MY: {
            name: 'Malaysia',
            code: '+60'
        },
        MV: {
            name: 'Maldives',
            code: '+960'
        },
        ML: {
            name: 'Mali',
            code: '+223'
        },
        MT: {
            name: 'Malta',
            code: '+356'
        },
        MH: {
            name: 'Marshall Islands',
            code: '+692'
        },
        MR: {
            name: 'Mauritania',
            code: '+222'
        },
        MU: {
            name: 'Mauritius',
            code: '+230'
        },
        YT: {
            name: 'Mayotte',
            code: '+262'
        },
        MX: {
            name: 'Mexico',
            code: '+52'
        },
        FM: {
            name: 'Micronesia',
            code: '+691'
        },
        MD: {
            name: 'Moldova',
            code: '+373'
        },
        MC: {
            name: 'Monaco',
            code: '+377'
        },
        MN: {
            name: 'Mongolia',
            code: '+976'
        },
        ME: {
            name: 'Montenegro',
            code: '+382'
        },
        MS: {
            name: 'Montserrat',
            code: '+1-664'
        },
        MA: {
            name: 'Morocco',
            code: '+212'
        },
        MZ: {
            name: 'Mozambique',
            code: '+258'
        },
        MM: {
            name: 'Myanmar',
            code: '+95'
        },
        NA: {
            name: 'Namibia',
            code: '+264'
        },
        NR: {
            name: 'Nauru',
            code: '+674'
        },
        NP: {
            name: 'Nepal',
            code: '+977'
        },
        NL: {
            name: 'Netherlands',
            code: '+31'
        },
        AN: {
            name: 'Netherlands Antilles',
            code: '+599'
        },
        NC: {
            name: 'New Caledonia',
            code: '+687'
        },
        NZ: {
            name: 'New Zealand',
            code: '+64'
        },
        NI: {
            name: 'Nicaragua',
            code: '+505'
        },
        NE: {
            name: 'Niger',
            code: '+227'
        },
        NG: {
            name: 'Nigeria',
            code: '+234'
        },
        NU: {
            name: 'Niue',
            code: '+683'
        },
        KP: {
            name: 'North Korea',
            code: '+850'
        },
        MP: {
            name: 'Northern Mariana Islands',
            code: '+1-670'
        },
        NO: {
            name: 'Norway',
            code: '+47'
        },
        OM: {
            name: 'Oman',
            code: '+968'
        },
        PK: {
            name: 'Pakistan',
            code: '+92'
        },
        PW: {
            name: 'Palau',
            code: '+680'
        },
        PS: {
            name: 'Palestine',
            code: '+970'
        },
        PA: {
            name: 'Panama',
            code: '+507'
        },
        PG: {
            name: 'Papua New Guinea',
            code: '+675'
        },
        PY: {
            name: 'Paraguay',
            code: '+595'
        },
        PE: {
            name: 'Peru',
            code: '+51'
        },
        PH: {
            name: 'Philippines',
            code: '+63'
        },
        PN: {
            name: 'Pitcairn',
            code: '+64'
        },
        PL: {
            name: 'Poland',
            code: '+48'
        },
        PT: {
            name: 'Portugal',
            code: '+351'
        },
        PR: {
            name: 'Puerto Rico',
            code: '+1-787, 1-939'
        },
        QA: {
            name: 'Qatar',
            code: '+974'
        },
        CG: {
            name: 'Republic of the Congo',
            code: '+242'
        },
        RE: {
            name: 'Reunion',
            code: '+262'
        },
        RO: {
            name: 'Romania',
            code: '+40'
        },

        RW: {
            name: 'Rwanda',
            code: '+250'
        },
        BL: {
            name: 'Saint Barthelemy',
            code: '+590'
        },
        SH: {
            name: 'Saint Helena',
            code: '+290'
        },
        KN: {
            name: 'Saint Kitts and Nevis',
            code: '+1-869'
        },
        LC: {
            name: 'Saint Lucia',
            code: '+1-758'
        },
        MF: {
            name: 'Saint Martin',
            code: '+590'
        },
        PM: {
            name: 'Saint Pierre and Miquelon',
            code: '+508'
        },
        VC: {
            name: 'Saint Vincent and the Grenadines',
            code: '+1-784'
        },
        WS: {
            name: 'Samoa',
            code: '+685'
        },
        SM: {
            name: 'San Marino',
            code: '+378'
        },
        ST: {
            name: 'Sao Tome and Principe',
            code: '+239'
        },
        SA: {
            name: 'Saudi Arabia',
            code: '+966'
        },
        SN: {
            name: 'Senegal',
            code: '+221'
        },
        RS: {
            name: 'Serbia',
            code: '+381'
        },
        SC: {
            name: 'Seychelles',
            code: '+248'
        },
        SL: {
            name: 'Sierra Leone',
            code: '+232'
        },
        SG: {
            name: 'Singapore',
            code: '+65'
        },
        SX: {
            name: 'Sint Maarten',
            code: '+1-721'
        },
        SK: {
            name: 'Slovakia',
            code: '+421'
        },
        SI: {
            name: 'Slovenia',
            code: '+386'
        },
        SB: {
            name: 'Solomon Islands',
            code: '+677'
        },
        SO: {
            name: 'Somalia',
            code: '+252'
        },
        ZA: {
            name: 'South Africa',
            code: '+27'
        },
        SS: {
            name: 'South Sudan',
            code: '+211'
        },
        ES: {
            name: 'Spain',
            code: '+34'
        },
        LK: {
            name: 'Sri Lanka',
            code: '+94'
        },
        SD: {
            name: 'Sudan',
            code: '+249'
        },
        SR: {
            name: 'Suriname',
            code: '+597'
        },
        SJ: {
            name: 'Svalbard and Jan Mayen',
            code: '+47'
        },
        SZ: {
            name: 'Swaziland',
            code: '+268'
        },
        SE: {
            name: 'Sweden',
            code: '+46'
        },
        CH: {
            name: 'Switzerland',
            code: '+41'
        },
        SY: {
            name: 'Syria',
            code: '+963'
        },
        TW: {
            name: 'Taiwan',
            code: '+886'
        },
        TJ: {
            name: 'Tajikistan',
            code: '+992'
        },
        TZ: {
            name: 'Tanzania',
            code: '+255'
        },
        TH: {
            name: 'Thailand',
            code: '+66'
        },
        TG: {
            name: 'Togo',
            code: '+228'
        },
        TK: {
            name: 'Tokelau',
            code: '+690'
        },
        TO: {
            name: 'Tonga',
            code: '+676'
        },
        TT: {
            name: 'Trinidad and Tobago',
            code: '+1-868'
        },
        TN: {
            name: 'Tunisia',
            code: '+216'
        },
        TR: {
            name: 'Turkey',
            code: '+90'
        },
        TM: {
            name: 'Turkmenistan',
            code: '+993'
        },
        TC: {
            name: 'Turks and Caicos Islands',
            code: '+1-649'
        },
        TV: {
            name: 'Tuvalu',
            code: '+688'
        },
        VI: {
            name: 'U.S. Virgin Islands',
            code: '+1-340'
        },
        UG: {
            name: 'Uganda',
            code: '+256'
        },
        UA: {
            name: 'Ukraine',
            code: '+380'
        },
        AE: {
            name: 'United Arab Emirates',
            code: '+971'
        },
        GB: {
            name: 'United Kingdom',
            code: '+44'
        },

        UY: {
            name: 'Uruguay',
            code: '+598'
        },
        UZ: {
            name: 'Uzbekistan',
            code: '+998'
        },
        VU: {
            name: 'Vanuatu',
            code: '+678'
        },
        VA: {
            name: 'Vatican',
            code: '+379'
        },
        VE: {
            name: 'Venezuela',
            code: '+58'
        },
        WF: {
            name: 'Wallis and Futuna',
            code: '+681'
        },
        EH: {
            name: 'Western Sahara',
            code: '+212'
        },
        YE: {
            name: 'Yemen',
            code: '+967'
        },
        ZM: {
            name: 'Zambia',
            code: '+260'
        },
        ZW: {
            name: 'Zimbabwe',
            code: '+263'
        }
    };

    const renderItem = (item, idx) => {
        return <div className='product-item' key={`pi${idx}`}>
            <h6 className="fw-bold">{item.tour.attributes.title}</h6>
            <div className="check-out-row">
                <span className="title">{t("date")}</span>
                <span className="value">{moment().format("DD/MM/YYYY")}</span>
            </div>
            <div className="check-out-row">
                <span className="title">{t("ticket type")}</span>
                <span className="value">{item.itemAttrs.join(" ")}</span>
            </div>
            <div className="check-out-row">
                <span className="title">{t("quantity")}</span>
            </div>
            {item.priceList.map(pl => {
                return <div className="check-out-row">
                    <span className="title">- {t(`ageGroup${pl.ageGroup}`)}</span>
                    <span className="value">
                        {pl.quantity} x {moneyFormat(locale === "en" ? pl.usdPrice : pl.price, locale)}
                    </span>
                </div>
            })}
        </div>
    };

    const getSubTotal = () => {
        let total = 0;
        checkOutItems.map(item => {
            let childTotal = 0;
            item.priceList.map(item2 => {
                childTotal += (locale === 'en' ? item2.usdPrice : item2.price) * item2.quantity;
            });
            total += childTotal;
        });
        return total;
    };

    return <PageLayout>
        <Container className="check-out-section">
            <div>
                <h1><span className="text-capitalize">{t("payment")}</span></h1>
            </div>
            <CheckoutForm>
                {(handleSubmit
                    , handleChange
                    , values
                    , touched
                    , isValid
                    , errors
                    , isSuccess
                    , loading
                    , isSubmitting
                    , handleBlur2) => (
                    <Row className="gy-3">
                        <Col xs={12} md={7}>
                            <h5 className="mt-3 text-capitalize fw-bold">{t("co.t1")}</h5>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="fullname">
                                        <Form.Label>{t("fullname")}</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder={t("co.form1")}
                                                      name="fullname"
                                                      value={values.fullname}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur2}
                                                      required
                                                      isInvalid={!!errors.fullname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullname}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>{t("email")}</Form.Label>
                                        <Form.Control name="email"
                                                      type="email"
                                                      placeholder={t("co.form2")}
                                                      value={values.email}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur2}
                                                      required
                                                      isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="countryCode">
                                        <Form.Label>{t("country")}</Form.Label>
                                        <Form.Select name={"countryCode"}
                                                     value={values.countryCode}
                                                     placeholder={t("co.form4")}
                                                     onChange={handleChange}
                                                     onBlur={handleBlur2}
                                                     required
                                                     isInvalid={!!errors.countryCode}
                                        >
                                            {Object.keys(countryData).map((keyName) => {
                                                return <option key={`country${keyName}`} value={countryData[keyName].code}>
                                                    {countryData[keyName].name}
                                                </option>
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.countryCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label>{t("phone")}</Form.Label>
                                        <Form.Control name="phone"
                                                      type="text"
                                                      placeholder={t("co.form3")}
                                                      value={values.phone}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur2}
                                                      required
                                                      isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <h5 className="mt-3 text-capitalize fw-bold">{t("co.t2")}</h5>
                                    <div className="d-flex justify-content-between" style={{columnGap: "10px"}}>
                                        <div className="payment-item">
                                            <Form.Check
                                                inline
                                                onChange={handleChange}
                                                onBlur={handleBlur2}
                                                label={`${t("co.pw")} Paypal`}
                                                value={"paypal"}
                                                name="paymentType"
                                                id={"p-i-paypal"}
                                                type={"radio"}
                                                isInvalid={!!errors.paymentType}
                                            />
                                            <Image src={"/images/payment/paypal.png"}
                                                   alt={"Paypal"}
                                                   width={75}
                                                   height={20}
                                                   className=""
                                            />
                                        </div>
                                        <div className="payment-item">
                                            <Form.Check
                                                inline
                                                onChange={handleChange}
                                                onBlur={handleBlur2}
                                                value={"vnpay"}
                                                label={`${t("co.pw")} Vnpay`}
                                                name="paymentType"
                                                id={"p-i-vnpay"}
                                                type={"radio"}
                                                isInvalid={!!errors.paymentType}
                                            />
                                            <Image src={"/images/payment/vnpay.png"}
                                                   alt={"Paypal"}
                                                   width={84}
                                                   height={20}
                                                   className=""
                                            />
                                        </div>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.paymentType}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col xs={12}>
                                    <Form.Check
                                        inline
                                        label={`${t("co.t3")}`}
                                        name="agreeWithTerm"
                                        className="mt-3"
                                        id={`agree-term`}
                                        type={"checkbox"}
                                        onChange={handleChange}
                                        onBlur={handleBlur2}
                                        value={true}
                                        isInvalid={!!errors.agreeWithTerm}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.agreeWithTerm}
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={5} className="bg-grey p-3 p-xl-5 rounded-3">
                            <h5 className="text-capitalize">{t("co.t4")}</h5>
                            <hr className="text-grey"/>
                            {checkOutItems?.map((item, idx) => {
                                return renderItem(item, idx)
                            })}
                            <hr className="text-grey dashed"/>
                            <div className='product-item'>
                                <div className="check-out-row">
                                    <span className="title">{t("subtotal")}</span>
                                    <span className="value">{moneyFormat(getSubTotal(), locale)}</span>
                                </div>
                                <div className="check-out-row">
                                    <span className="title">{t("discount")}</span>
                                    <span className="value">0.00 $</span>
                                </div>
                                <div className="check-out-row">
                                    <span className="title">{t("taxes&fees")}</span>
                                    <span className="value">0.00 $</span>
                                </div>

                            </div>
                            <hr className="text-grey "/>
                            <div className='product-item'>
                                <div className="check-out-row">
                                    <span className="title text-black">{t("total")}</span>
                                    <span className="value text-danger">{moneyFormat(getSubTotal(), locale)}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <Button disabled={loading || checkOutItems.length == 0}
                                        type="submit"
                                        className="w-75 text-capitalize">
                                    {t('co.t5')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                )}
            </CheckoutForm>
        </Container>
        <DecorComponent/>
    </PageLayout>
};

export const getServerSideProps = async (context) => {
    const {locale = 'en'} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
};


export default Page;