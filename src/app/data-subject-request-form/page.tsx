// @ts-nocheck
"use client";
import { useState } from "react";

export default function DataSubjectRequestFormPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    usState: "",
    relationship: "",
    relationshipOther: "",
    californiaRights: [],
    virginiaRights: [],
    coloradoRights: [],
    connecticutRights: [],
    utahRights: [],
    nevadaRights: [],
    euRights: [],
    additionalInfo: "",
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (
    field: keyof typeof formData,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const currentValues = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter((v) => v !== value) };
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 text-base">
      <div className="WordSection1" style={{ textAlign: "left" }}>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            msoMarginBottomAlt: "auto",
            lineHeight: "normal",
            msoOutlineLevel: 1,
            background: "white",
          } as any}
        >
          <b>
            <u>
              <span
                style={{
                  fontSize: "27.0pt",
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "18.0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                DATA SUBJECT RIGHTS REQUEST FORM
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontSize: "27.0pt",
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "18.0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <i>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#888888",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              [Last Amended: May 26, 2024]
            </span>
          </i>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We values privacy rights. As required under applicable laws, and
            specifically the EU General Data Protection Regulations (""), the
            California Consumer Privacy Act of 2018 as amended and revised by the
            California Privacy Rights Act of 2020 (collectively "CCPA"), the
            Virginia Consumer Data Protection Act of 2021 ("VCDPA"), the
            Colorado Consumer Protection Act ("CPA"), the Connecticut&nbsp;Data
            Privacy Act ("CTDPA"), the Utah Consumer Privacy Act ("UCPA"), the
            Nevada Revised Statutes Chapter 603A ("Nevada Privacy Law"), the
            Israeli Protection of Privacy Law ("IPPL") (which collectively shall
            be referred herein as "Data Protection Laws"), individuals are
            permitted to make certain requests and exercise certain rights
            regarding their Personal Data or Personal Information (as such term
            is defined under the applicable Data Protection Laws) depending on
            their jurisdiction.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            In order to submit a request to exercise individual rights pursuant
            to the Data Protection Laws, please complete this form and send it
            to our team at:&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "black",
              msoColorAlt: "windowtext",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            info@buyereview.com
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Upon receipt of your completed request, we will process it and
            respond within the timelines required under applicable Data
            Protection Laws. If additional information is necessary, we will
            contact you using the contact information you provided in this form.
            Information provided in connection with this request will be
            processed only for the purpose of processing and responding to your
            request and will be deleted immediately thereafter. For more
            information, please review our Privacy Policy.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            msoMarginBottomAlt: "auto",
            lineHeight: "normal",
            msoOutlineLevel: 2,
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontSize: "18.0pt",
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              1)&nbsp;<u>CONTACT INFORMATION:</u>
              
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Full Name:
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Email Address:
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If applicable, US State:
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            msoMarginBottomAlt: "auto",
            lineHeight: "normal",
            msoOutlineLevel: 2,
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontSize: "18.0pt",
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              2)&nbsp;<u>WHAT IS YOUR RELATIONSHIP WITH US?</u>
              
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ User
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Partner
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Employee
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Non-User
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Vendor
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Other: _______
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            msoMarginBottomAlt: "auto",
            lineHeight: "normal",
            msoOutlineLevel: 2,
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontSize: "18.0pt",
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              3)&nbsp;<u>YOUR REQUEST:</u>
              
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Detailed below are various rights and requests you may submit
            depending on your residence. Please check the applicable right you
            are requesting to execute.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                A. CALIFORNIA
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Note: Under the CCPA your rights only apply to the Personal
            Information collected 12 months prior to the request and you are not
            entitled to submit more than 2 requests in a 12 months period
            <i>.</i>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Please check the applicable right you are requesting to execute:
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Know or Access;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Deletion;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Data Portability;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Non-Discrimination;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Rectification;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Limit the Use and Disclosure of Sensitive Personal
            Information;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Opt-out of Sale;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Opt-Out of Sharing for Cross-Contextual Behavioral
            Advertising; or
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Opt-Out of the Use of Automated Decision Making.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                CCPA Opt-Out Rights:
              </span>
            </u>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            The Right to Opt-out of Sale; Opt-Out of Sharing for
            Cross-Contextual Behavioral Advertising; can be executed without
            filling the form:&nbsp;&nbsp;&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <ul type="disc">
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l0 level1 lfo1",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              through the cookie settings available on Company's Properties;
              
            </span>
          </li>
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l0 level1 lfo1",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              through device settings (opt-out from tracking AAID, ADID, please
              see the following for information applicable to all devices:&nbsp;
            </span>
            <span style={{ color: "black", msoColorAlt: "windowtext" }}>
              <a href="https://thenai.org/opt-out/mobile-opt-out/">
                <span
                  style={{
                    fontFamily: '"__Inter_Fallback_aaf875",serif',
                    msoFareastFontFamily: '"Times New Roman"',
                    msoBidiFontFamily: '"Times New Roman"',
                    color: "#006FFF",
                    msoFontKerning: "0pt",
                    msoLigatures: "none",
                    msoFareastLanguage: "#1000",
                  }}
                >
                  https://thenai.org/opt-out/mobile-opt-out/
                </span>
              </a>
            </span>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              );
              
            </span>
          </li>
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l0 level1 lfo1",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              by using Self-Regulatory Program for Online Behavioral Advertising
              such as:&nbsp;
              
            </span>
          </li>
        </ul>
        <ul type="disc">
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l2 level1 lfo2",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Digital Advertising Alliance's ("<b>DAA</b>"):&nbsp;
            </span>
            <span style={{ color: "black", msoColorAlt: "windowtext" }}>
              <a href="https://www.aboutads.info/choices">
                <span
                  style={{
                    fontFamily: '"__Inter_Fallback_aaf875",serif',
                    msoFareastFontFamily: '"Times New Roman"',
                    msoBidiFontFamily: '"Times New Roman"',
                    color: "#006FFF",
                    msoFontKerning: "0pt",
                    msoLigatures: "none",
                    msoFareastLanguage: "#1000",
                  }}
                >
                  https://www.aboutads.info/choices
                </span>
              </a>
            </span>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              &nbsp;&nbsp;
              
            </span>
          </li>
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l2 level1 lfo2",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Network Advertising Initiative ("<b>NAI</b>"):&nbsp;
            </span>
            <span style={{ color: "black", msoColorAlt: "windowtext" }}>
              <a href="https://www.networkadvertising.org/choices">
                <span
                  style={{
                    fontFamily: '"__Inter_Fallback_aaf875",serif',
                    msoFareastFontFamily: '"Times New Roman"',
                    msoBidiFontFamily: '"Times New Roman"',
                    color: "#006FFF",
                    msoFontKerning: "0pt",
                    msoLigatures: "none",
                    msoFareastLanguage: "#1000",
                  }}
                >
                  https://www.networkadvertising.org/choices
                </span>
              </a>
            </span>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              .&nbsp;
              
            </span>
          </li>
        </ul>
        <ul type="disc">
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l3 level1 lfo3",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              install privacy-controls in the browser's settings to
              automatically signal the opt-out preference to all websites you
              visit (like the "
            </span>
            <span style={{ color: "black", msoColorAlt: "windowtext" }}>
              <a href="https://globalprivacycontrol.org/">
                <span
                  style={{
                    fontFamily: '"__Inter_Fallback_aaf875",serif',
                    msoFareastFontFamily: '"Times New Roman"',
                    msoBidiFontFamily: '"Times New Roman"',
                    color: "#006FFF",
                    msoFontKerning: "0pt",
                    msoLigatures: "none",
                    msoFareastLanguage: "#1000",
                  }}
                >
                  Global Privacy Control
                </span>
              </a>
            </span>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              "). We honor the Global Privacy Control, where applicable, subject
              to your jurisdiction, as a valid request to opt-out of the sharing
              of information linked to your browser.
              
            </span>
          </li>
        </ul>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Please know that opting out of interest-based advertising does not
            mean that you will not receive advertising. You may still receive
            ads, but those ads may be less relevant to your interests.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Authorized Agency:&nbsp;
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            You may submit the request by an authorized agency as detailed in
            the CCPA Notice available here.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            "
          </span>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Authorized agents
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            " may submit opt out requests on a consumer's behalf. If you have
            elected to use an authorized agent, or if you are an authorized
            agent who would like to submit requests on behalf of a consumer, the
            following procedures will be required prior to acceptance of any
            requests by an authorized agent on behalf of a California consumer.
            Usually, we will accept requests from qualified third parties on
            behalf of other consumers, regardless of either the consumer or the
            authorized agent's state of residence, provided that the third party
            successfully completes the following qualification procedures:
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <ul type="disc">
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l1 level1 lfo4",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Provide the authorized agent signed permission to do so or power
              of attorney.&nbsp;
              
            </span>
          </li>
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l1 level1 lfo4",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Verify their identity directly with the business.
              
            </span>
          </li>
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l1 level1 lfo4",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Directly confirm with the business that they provided the
              authorized agent permission to submit the request.
              
            </span>
          </li>
        </ul>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            A business may deny a request from an authorized agent that does not
            submit proof that they have been authorized by the consumer to act
            on their behalf.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We will aim to complete CCPA verifiable consumer requests as soon as
            reasonably practicable and consistent the 45-days timeframe mandated
            by the CCPA. If we require additional time, we will inform you of
            the reason and extension period in writing. In some cases, our
            ability to uphold these rights for you may depend upon our
            obligations to process Personal Information for security, safety,
            fraud prevention reasons, compliance with regulatory or legal
            requirements, or because processing is necessary to deliver the
            services you have requested. Where this is the case, we will inform
            you of specific details in response to your request.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                B. VIRGINIA
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Confirm if the Data is Being Processed and to Access That
            Personal Data;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Deletion;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Data Portability;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Correct Inaccuracies;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Opt-Out of the Processing of the Personal Data for Purposes
            of Targeted Advertising, the Sale of Personal Data, or Profiling in
            Furtherance of Decisions that Produce Legal or Similarly Significant
            Effects Concerning the Consumer; or
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Other.
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            The opt-out right can be done without filling this form as detailed
            under section A above&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://docs.google.com/document/d/19LIe4iGXB_Ootl2sx6GZota2dkOEShH7HJ_LQqHHCzI/edit#heading=h.2s8eyo1">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                "CALIFORNIA"
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We will aim to complete all VCDPA authenticated consumer request as
            soon as reasonably practicable and consistent the 45-days timeframe
            mandated by the VCDPA. If you have an account with us, we may
            require you to use the account to submit the request.&nbsp;If we are
            unable to authenticate your request using commercially reasonable
            efforts, we may request additional information reasonably necessary
            to authenticate you and your request. If we cannot authenticate you
            and your request we will not be able to grant your request.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we refuse to take action on a request, you may appeal our
            decision within a reasonable period time by contacting us and
            specifying you wish to appeal. Within 60 days of our receipt of your
            appeal, we will inform you in writing of any action taken or not
            taken in response to the appeal, including a written explanation of
            the reasons for the decisions. If the appeal is denied, you may
            submit a complaint to the Virginia Attorney General at&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://www.oag.state.va.us/consumercomplaintform">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                https://www.oag.state.va.us/consumercomplaintform
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we are unable to authenticate your request using commercially
            reasonable efforts, we may request additional information reasonably
            necessary to authenticate you and your request. If we cannot
            authenticate you and your request we will not be able to grant your
            request.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                C. COLORADO
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right of Access;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Correction;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Deletion of Personal Data;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Data Portability – to obtain a portable copy of the data;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Opt-out of the Processing of Personal Data for the Purposes
            of: Targeted advertising; Sale for personal data; or Profiling used
            for decisions that produce legal or similarly significant effects on
            a consumer; or
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Other.
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            The opt-out right can be done without filling this form as detailed
            under section A above&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://docs.google.com/document/d/19LIe4iGXB_Ootl2sx6GZota2dkOEShH7HJ_LQqHHCzI/edit#heading=h.2s8eyo1">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                "CALIFORNIA"
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We will&nbsp;aim&nbsp;to complete CPA consumer request as soon as
            reasonably practicable and consistent the 45-days timeframe mandated
            by the CPA. We reserve the right to extend the response time by
            additional 45-days when reasonably necessary and provided consumer
            notification of the extension is made within the first
            45-days.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we refuse to take action on your request, you may appeal our
            refusal within a reasonable period after you have received notice of
            the refusal by contacting us and specifying you wish to
            appeal.&nbsp; Within 60-days of our receipt of your appeal, we will
            inform you in writing of any action taken or not taken in response
            to the appeal, including a written explanation of the reasons for
            the decisions.&nbsp;You may also contact the Colorado Attorney
            General if you have concerns about the result of the appeal as
            follows: Colorado AG at&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://coag.gov/file-complaint/">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                https://coag.gov/file-complaint/
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If you have an account with us, we may deliver our written response
            to that account or via email at our sole discretion. If you do not
            have an account with us, we will deliver our written response by
            mail or electronically, at your option. You do not need to create an
            account for submitting a request.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Any disclosures we provide will only cover the 12-month period
            preceding our receipt of your request. The response we provide will
            also explain the reasons we cannot comply with a request, if
            applicable.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                D.&nbsp;CONNECTICUT
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Confirm if the Data is Being Processed
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Correction;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Deletion of Personal Data;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Data Portability – to obtain a portable copy of the data;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Opt-out of the Processing of Personal Data for the Purposes
            of Targeted advertising; Sale for personal data; or Profiling used
            for decisions that produce legal or similarly significant effects on
            a consumer; or
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Other
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Note, where your consent is required, however revoked, we will cease
            processing the applicable data set as soon as practicable, but not
            later than fifteen days after the receipt of your request.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <ul type="disc">
          <li
            className="MsoNormal"
            style={{
              color: "#313131",
              msoMarginTopAlt: "auto",
              marginBottom: "15.0pt",
              lineHeight: "normal",
              msoList: "l4 level1 lfo5",
              tabStops: "list .5in",
              background: "white",
            }}
          >
            <b>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                Opt-Out Right and Authorized Agency:
              </span>
            </b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              
            </span>
          </li>
        </ul>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            The opt-out right can be done without filling this form as detailed
            under section A above&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://docs.google.com/document/d/19LIe4iGXB_Ootl2sx6GZota2dkOEShH7HJ_LQqHHCzI/edit#heading=h.2s8eyo1">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                "CALIFORNIA"
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            , except for the option to opt-out using universal opt-out
            mechanisms which will be recognized by us for Connecticut's
            consumer's requests on January 1, 2025.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Please note you may&nbsp;designate an authorized agent on your
            behalf to exercise your right to opt out detailed above. You may
            designate such authorized agent by way of, among other things, a
            technology, including, but not limited to, an Internet link or a
            browser setting, browser extension or global device setting,
            indicating your intent to opt out of such processing, all as
            detailed&nbsp;under section A above&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://docs.google.com/document/d/19LIe4iGXB_Ootl2sx6GZota2dkOEShH7HJ_LQqHHCzI/edit#heading=h.2s8eyo1">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                "CALIFORNIA"
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We shall respond to your CTDPA requests within 45 days of receipt.
            The response period may be extended once by 45 additional days when
            reasonably necessary, taking into account the complexity and number
            of requests and we inform you of such extension within the initial
            45 days response period, together with the reason for the extension.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we decline to take action on your request, we shall so inform you
            without undue delay, within 45 days of receipt of your request.
            The&nbsp;notification&nbsp;will include a justification for
            declining to take action.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we are unable to authenticate your request using commercially
            reasonable efforts, we may request additional information reasonably
            necessary to authenticate you and your request. If we cannot
            authenticate you and your request, we will not be able to grant your
            request.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                E. UTAH
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Confirm if the Data is Being Processed;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Access;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Deletion of Personal Data;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Data Portability – to obtain a portable copy of the data;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Opt-out of the Processing of Personal Data for the Purposes
            of Targeted advertising; or the Sale for personal data; or
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Other
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            The opt-out right can be done without filling this form as detailed
            under section A above&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://docs.google.com/document/d/19LIe4iGXB_Ootl2sx6GZota2dkOEShH7HJ_LQqHHCzI/edit#heading=h.2s8eyo1">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                "CALIFORNIA"
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We shall respond to your UCPA requests within 45 days of receipt.
            The response period may be extended once by 45 additional days when
            reasonably necessary, taking into account the complexity and number
            of requests and we inform you of such extension within the initial
            45 days response period, together with the reason for the extension.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we decline to take action on your request, we shall so inform you
            without undue delay, within 45 days of receipt of your request.
            The&nbsp;notification&nbsp;will include a justification for
            declining to take action.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If we are unable to authenticate your request using commercially
            reasonable efforts, we may request additional information reasonably
            necessary to authenticate you and your request. If we cannot
            authenticate you and your request, we will not be able to grant your
            request.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                F.&nbsp;NEVADA
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Opt-Out from Sale of Covered Information.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            To the extent applicable, such right can be exercised without
            filling this form as detailed under section A above&nbsp;
          </span>
          <span style={{ color: "black", msoColorAlt: "windowtext" }}>
            <a href="https://docs.google.com/document/d/19LIe4iGXB_Ootl2sx6GZota2dkOEShH7HJ_LQqHHCzI/edit#heading=h.2s8eyo1">
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#888888",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                "CALIFORNIA"
              </span>
            </a>
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <u>
              <span
                style={{
                  fontFamily: '"__Inter_Fallback_aaf875",serif',
                  msoFareastFontFamily: '"Times New Roman"',
                  msoBidiFontFamily: '"Times New Roman"',
                  color: "#313131",
                  msoFontKerning: "0pt",
                  msoLigatures: "none",
                  msoFareastLanguage: "#1000",
                }}
              >
                G.&nbsp;NOTICE
              </span>
            </u>
          </b>
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              :
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Deletion Rights under US data protection regulations, is not
              absolute
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;- we may deny your deletion request, in full or in part, if
            retaining the information is necessary for us or our service
            provider(s) for any of the following reasons: (1) complete the
            transaction for which we collected the Personal Data, provide a good
            or service that you requested, take actions reasonably anticipated
            within the context of our ongoing business relationship with you,
            fulfill the terms of a written warranty or product recall conducted
            in accordance with federal law, or otherwise perform our contract
            with you; (2) detect security incidents, protect against malicious,
            deceptive, fraudulent, or illegal activity, or prosecute those
            responsible for such activities; (3) debug products to identify and
            repair errors that impair existing intended functionality; (4)
            exercise free speech, ensure the right of another consumer to
            exercise their free speech rights, or exercise another right
            provided for by law; (5) Comply with the law or legal obligation;
            (6) engage in public or peer-reviewed scientific, historical, or
            statistical research in the public interest that adheres to all
            other applicable ethics and privacy laws, when the information's
            deletion may likely render impossible or seriously impair the
            research's achievement, if you previously provided informed consent;
            (7) enable solely internal uses that are reasonably aligned with
            consumer expectations based on your relationship with us; (8) make
            other internal and lawful uses of that information that are
            compatible with the context in which you provided it.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We will delete or de-identify personal information not subject to
            one of these exceptions from our records and will direct our
            processors to take similar action.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            msoMarginBottomAlt: "auto",
            lineHeight: "normal",
            msoOutlineLevel: 3,
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontSize: "15.0pt",
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              H.&nbsp;<u>EU, UK, EEA AND&nbsp;OTHER JURISDICTIONS</u>:
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to be Informed to the Processing of Personal Data;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Access to Your Personal Data;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Rectification and Amendment;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Deletion / Erasure;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Restrict Processing;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Data Portability;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Right to Object to the Processing of Personal Data;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Right to Withdraw Consent;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Rights Related to Automated Decision-Making and Profiling; or
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            ◻ Other
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We will&nbsp;aim&nbsp;to complete your verified data subject request
            as soon as reasonably practicable and consistent with the 30-days
            timeframe mandated by the GDPR or as otherwise mandated by the
            applicable Data Protection Law under this category H. We reserve the
            right to extend the response time by additional 30-days when
            reasonably necessary and provided consumer notification of the
            extension is made within the first 30-days.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Every data subject should have the right to lodge a complaint with a
            single supervisory authority.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            If you have an account with us, we may deliver our written response
            to that account or via email at our sole discretion. If you do not
            have an account with us, we will deliver our written response by
            mail or electronically, at your option. You do not need to create an
            account for submitting a request.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Any disclosures we provide will only cover the 12-month period
            preceding our receipt of your request, unless otherwise stated. The
            response we provide will also explain the reasons we cannot comply
            with a request, if applicable.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            msoMarginBottomAlt: "auto",
            lineHeight: "normal",
            msoOutlineLevel: 2,
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontSize: "18.0pt",
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              4)&nbsp;<u>VALIDATION</u>
              
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            The verifiable request must provide enough information that allows
            us to reasonably verify you are the person about whom we collected
            Personal Information or an authorized representative.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            We cannot respond to your request if we cannot verify your identity
            or authority to make the request and confirm the Personal
            Information or Personal Data is relates to you.&nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            Describe your request with sufficient detail that allows us to
            properly understand, evaluate, and respond to it.
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <b>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#313131",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Substantiate the request - please provide additional information
              about your request:
            </span>
          </b>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <div
          className="MsoNormal"
          align="center"
          style={{
            marginBottom: "0in",
            textAlign: "center",
            lineHeight: "normal",
          }}
        >
          <span
            style={{
              fontFamily: '"Times New Roman",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            <hr
              size={2}
              width="100%"
              noshade=""
              style={{ color: "#313131" }}
              align="center"
            />
          </span>
        </div>
        <div
          className="MsoNormal"
          align="center"
          style={{
            marginBottom: "0in",
            textAlign: "center",
            lineHeight: "normal",
          }}
        >
          <span
            style={{
              fontFamily: '"Times New Roman",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            <hr
              size={2}
              width="100%"
              noshade=""
              style={{ color: "#313131" }}
              align="center"
            />
          </span>
        </div>
        <div
          className="MsoNormal"
          align="center"
          style={{
            marginBottom: "0in",
            textAlign: "center",
            lineHeight: "normal",
          }}
        >
          <span
            style={{
              fontFamily: '"Times New Roman",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            <hr
              size={2}
              width="100%"
              noshade=""
              style={{ color: "#313131" }}
              align="center"
            />
          </span>
        </div>
        <div
          className="MsoNormal"
          align="center"
          style={{
            marginBottom: "0in",
            textAlign: "center",
            lineHeight: "normal",
          }}
        >
          <span
            style={{
              fontFamily: '"Times New Roman",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            <hr
              size={2}
              width="100%"
              noshade=""
              style={{ color: "#313131" }}
              align="center"
            />
          </span>
        </div>
        <div
          className="MsoNormal"
          align="center"
          style={{
            marginBottom: "0in",
            textAlign: "center",
            lineHeight: "normal",
          }}
        >
          <span
            style={{
              fontFamily: '"Times New Roman",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            <hr
              size={2}
              width="100%"
              noshade=""
              style={{ color: "#313131" }}
              align="center"
            />
          </span>
        </div>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <i>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#888888",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Thank you for filling in the form, please send it to
            </span>
          </i>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#888888",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            :
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            &nbsp;
          </span>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "black",
              msoColorAlt: "windowtext",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            info@buyereviews.com
          </span>
          <i>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#888888",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              . We will process the request within the time frame under the
              applicable Data Protection Law, we reserve the right to extend the
              aforementioned period by the time specified in the Data Protection
              Laws if the request is complex or numerous or we require
              additional information.&nbsp;
            </span>
          </i>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "9.0pt",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <i>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#888888",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              The processing of the request is free of charge; however, we may
              want to reserve the right to charge a reasonable fee to cover
              certain administrative costs (such as providing additional copies
              of the data) or for handling manifestly unfounded or excessive
              requests.
            </span>
          </i>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131", 
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{
            msoMarginTopAlt: "auto",
            marginBottom: "0in",
            lineHeight: "normal",
            background: "white",
          }}
        >
          <i>
            <span
              style={{
                fontFamily: '"__Inter_Fallback_aaf875",serif',
                msoFareastFontFamily: '"Times New Roman"',
                msoBidiFontFamily: '"Times New Roman"',
                color: "#888888",
                msoFontKerning: "0pt",
                msoLigatures: "none",
                msoFareastLanguage: "#1000",
              }}
            >
              Note that, you might not be eligible to exercise all or part of
              the rights detailed above – this depends on your jurisdiction and
              the applicable Data Protections Law, our relationship, and our
              rights to refuse or retain data under applicable Data Protection
              Law. Where we are not able to provide you with the information for
              which you have asked or otherwise fulfil your request, we will
              endeavor to explain the reasoning for this and inform you of your
              rights.
            </span>
          </i>
          <span
            style={{
              fontFamily: '"__Inter_Fallback_aaf875",serif',
              msoFareastFontFamily: '"Times New Roman"',
              msoBidiFontFamily: '"Times New Roman"',
              color: "#313131",
              msoFontKerning: "0pt",
              msoLigatures: "none",
              msoFareastLanguage: "#1000",
            }}
          >
            {/*  */}
          </span>
        </p>
        <p className="MsoNormal">
          {/* <o:p>&nbsp;</o:p> */}
        </p>
      </div>
    </div>
  );
}
