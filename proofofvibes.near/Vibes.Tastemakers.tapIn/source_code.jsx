const PRIMARY_COLOR = "#403E3E";
const accountId = props.accountId ?? context.accountId ?? "ogruss.near";
// add check you must be logged in and be a tastemaker
const isKnownUser = !!context.accountId;
const fileName = `${accountId}.svg`;
const NFT_CONTRACT = "nft.genadrop.near";
const SVG_CONTENT_TYPE = "image/svg+xml";

const PROOF_OF_VIBES_LOGO = `
<svg width="140" height="200" viewBox="0 20 160 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4426_23400)">
<path d="M10.0167 7.73909C9.92431 7.21981 10.1107 6.60853 9.99058 6.00662C9.93507 5.72834 9.7056 5.61282 9.44991 5.59069C9.21108 5.57001 8.96753 5.79232 8.92299 6.08498C8.87193 6.42064 8.84253 6.76338 8.84541 7.10268C8.85032 7.67084 8.88774 8.23871 8.91276 8.80668C8.92134 9.00165 8.91703 9.19924 8.9482 9.39088C9.00375 9.73283 9.18021 9.87974 9.50389 9.88828C9.84502 9.89731 10.0155 9.78213 10.0762 9.42418C10.1657 8.89778 9.93439 8.37048 10.0167 7.73909ZM16.5455 7.12148C16.5455 7.12485 16.5451 7.11811 16.5455 7.12148C16.655 7.8627 16.6212 8.31493 16.7502 9.01424C16.8013 9.29139 16.9968 9.46729 17.2999 9.48276C17.5835 9.49729 17.8244 9.34862 17.9294 9.04338C18.0024 8.83125 18.0443 8.60216 18.0601 8.37786C18.1188 7.5445 18.0702 6.72053 17.7355 5.93998C17.6356 5.70725 17.4799 5.53184 17.1803 5.54675C16.877 5.56188 16.6792 5.72179 16.5972 5.98534C16.5072 6.27482 16.5421 6.65344 16.5455 7.12148ZM12.8197 21.8321C13.1947 21.8026 13.6003 21.7657 14.0067 21.7395C15.3418 21.6534 16.6017 21.2835 17.7941 20.695C19.3701 19.9171 20.6921 18.8147 21.7634 17.4246C23.2176 15.5377 24.1073 13.4122 24.3536 11.035C24.3831 10.7513 24.3302 10.4466 24.2543 10.1684C24.1942 9.94791 24.0271 9.7783 23.7557 9.76512C23.4852 9.75197 23.3154 9.88832 23.2294 10.119C23.1391 10.3613 23.0652 10.6133 23.0169 10.8673C22.7484 12.2812 22.3813 13.6611 21.6564 14.9207C20.6103 16.7385 19.2484 18.2473 17.3615 19.2199C15.4173 20.2219 13.3577 20.5136 11.1961 20.1918C9.47366 19.9354 7.96298 19.2419 6.62767 18.1319C5.65002 17.3192 5.00743 16.2698 4.44387 15.1577C4.37034 15.0126 4.31235 14.846 4.20009 14.7385C4.10929 14.6516 3.93013 14.5791 3.82267 14.6106C3.72487 14.6393 3.61304 14.8148 3.6089 14.9292C3.59901 15.2029 3.61284 15.4879 3.68077 15.752C4.01647 17.0568 4.77519 18.1187 5.72977 19.0254C7.69976 20.8966 10.0996 21.7321 12.8197 21.8321ZM11.4381 25.0536C9.20111 25.0415 7.63372 24.7533 6.23893 23.8201C5.17883 23.1108 4.30348 22.2044 3.62593 21.1381C2.88426 19.9709 2.22715 18.7495 1.54441 17.5455C1.23106 16.9929 0.970504 16.4093 0.640173 15.8677C0.0591743 14.9152 -0.0666345 13.8725 0.0289082 12.8041C0.184084 11.0692 0.731121 9.43609 1.40587 7.83716C1.64295 7.27543 2.00235 6.83744 2.43561 6.43495C3.84761 5.12325 5.29611 3.85567 6.92142 2.8099C8.60036 1.72966 10.3591 0.831014 12.3174 0.345909C15.1688 -0.3604 17.863 0.00304344 20.3502 1.54592C22.8183 3.077 24.7089 5.16022 25.9045 7.83112C26.4682 9.09043 26.7678 10.4149 26.8641 11.7964C27.054 14.5201 26.3982 17.0259 25.0166 19.3604C24.1968 20.7455 22.9705 21.6671 21.5614 22.3709C19.363 23.4688 17.0523 24.2473 14.6304 24.6571C13.3807 24.8685 12.1127 24.9721 11.4381 25.0536Z" fill="white"/>
<path d="M39.9902 6.98955C41.0491 6.98955 41.8631 7.21928 42.4324 7.67877C43.0119 8.13827 43.3015 8.74756 43.3015 9.50673C43.3015 9.80639 43.2565 10.121 43.1666 10.4507C42.8868 11.4496 42.3324 12.1887 41.5035 12.6682C40.6843 13.1476 39.6456 13.3874 38.387 13.3874H36.8437L36.3343 15.2003C36.3143 15.2603 36.3043 15.3402 36.3043 15.4401C36.3043 15.5799 36.3343 15.6948 36.3942 15.7847C36.4641 15.8746 36.564 15.9795 36.6939 16.0993C36.8037 16.1992 36.8787 16.2742 36.9186 16.3241C36.9586 16.374 36.9786 16.434 36.9786 16.5039C36.9786 16.6737 36.8987 16.7935 36.7388 16.8635C36.579 16.9334 36.3443 16.9684 36.0346 16.9684H32.2738C32.0141 16.9684 31.8194 16.9234 31.6895 16.8335C31.5596 16.7336 31.5147 16.5988 31.5546 16.429C31.5746 16.3391 31.6146 16.2691 31.6745 16.2192C31.7244 16.1593 31.8044 16.0944 31.9142 16.0244C32.084 15.9245 32.2189 15.8196 32.3188 15.7098C32.4187 15.5999 32.4986 15.4301 32.5585 15.2003L34.3865 8.74258C34.4264 8.61271 34.4464 8.48787 34.4464 8.368C34.4464 8.25814 34.4264 8.16824 34.3865 8.0983C34.3565 8.01841 34.3115 7.92851 34.2516 7.82861C34.1617 7.69874 34.1168 7.59386 34.1168 7.51396C34.1168 7.48399 34.1268 7.42904 34.1467 7.34914C34.1867 7.21928 34.2716 7.12938 34.4014 7.07945C34.5413 7.01951 34.751 6.98955 35.0307 6.98955H39.9902ZM39.6006 10.181C39.7104 9.81137 39.7654 9.48676 39.7654 9.20706C39.7654 8.6277 39.4957 8.33804 38.9563 8.33804H38.2821L37.2183 12.0389H37.8775C38.2971 12.0389 38.6368 11.909 38.8964 11.6493C39.1661 11.3796 39.401 10.8902 39.6006 10.181ZM49.1992 9.04225C49.7585 9.04225 50.2031 9.21204 50.5327 9.55168C50.8721 9.89131 51.0422 10.3108 51.0422 10.8103C51.0422 11.0001 51.0219 11.1748 50.9822 11.3347C50.8822 11.7442 50.6923 12.0589 50.4129 12.2786C50.1331 12.4984 49.7986 12.6082 49.409 12.6082C49.0292 12.6082 48.7396 12.5184 48.54 12.3386C48.3501 12.1588 48.1804 11.919 48.0305 11.6194C47.9504 11.4496 47.8755 11.3247 47.8058 11.2448C47.7358 11.1649 47.656 11.1249 47.5661 11.1249C47.4661 11.1249 47.3762 11.1649 47.2964 11.2448C47.2263 11.3247 47.1615 11.4645 47.1016 11.6643L45.9479 15.4101C45.9277 15.46 45.9179 15.535 45.9179 15.6349C45.9179 15.7647 45.9528 15.8746 46.0228 15.9645C46.1026 16.0444 46.2075 16.1243 46.3374 16.2042C46.4573 16.2841 46.5371 16.3491 46.5772 16.399C46.6169 16.4489 46.6319 16.5139 46.6221 16.5938C46.6019 16.7237 46.527 16.8185 46.3974 16.8785C46.2775 16.9384 46.0677 16.9684 45.7681 16.9684H41.9324C41.6724 16.9684 41.4878 16.9284 41.378 16.8485C41.2581 16.7586 41.2132 16.6437 41.2432 16.5039C41.2829 16.384 41.3877 16.2791 41.5578 16.1892C41.7076 16.1093 41.8324 16.0144 41.9324 15.9046C42.032 15.7947 42.117 15.6199 42.1871 15.3801L43.5206 11.05C43.5405 11.0001 43.5506 10.9301 43.5506 10.8402C43.5506 10.7304 43.5255 10.6454 43.4757 10.5855C43.4356 10.5256 43.3655 10.4507 43.2659 10.3608C43.1659 10.2809 43.0958 10.2109 43.0561 10.151C43.016 10.0911 43.0112 10.0112 43.0411 9.91127C43.1011 9.68154 43.4157 9.48174 43.9851 9.31194C44.5544 9.13215 45.1485 9.04225 45.7681 9.04225C46.1775 9.04225 46.5172 9.13713 46.7869 9.32693C47.0566 9.50673 47.2312 9.76642 47.3114 10.1061C47.7908 9.39686 48.4201 9.04225 49.1992 9.04225ZM56.0181 9.04225C57.3763 9.04225 58.3753 9.31693 59.0147 9.86632C59.6639 10.4157 59.9886 11.1349 59.9886 12.0239C59.9886 12.3236 59.9486 12.6582 59.8688 13.0278C59.6789 13.8469 59.3241 14.5661 58.805 15.1854C58.2854 15.7947 57.646 16.2691 56.8871 16.6088C56.138 16.9384 55.3236 17.1032 54.4449 17.1032C53.0563 17.1032 52.0273 16.8285 51.3583 16.2791C50.6991 15.7198 50.3694 14.9806 50.3694 14.0616C50.3694 13.752 50.4091 13.4073 50.4893 13.0278C50.6788 12.2487 51.0384 11.5594 51.5681 10.9601C52.1075 10.3508 52.7615 9.88131 53.5309 9.55168C54.31 9.21204 55.139 9.04225 56.0181 9.04225ZM55.9731 10.3758C55.7634 10.3758 55.5386 10.5656 55.2989 10.9451C55.0689 11.3147 54.7943 12.0189 54.4748 13.0577C54.1549 14.0966 53.9954 14.8258 53.9954 15.2453C53.9954 15.4651 54.0302 15.6149 54.1002 15.6948C54.1699 15.7647 54.2651 15.7997 54.3849 15.7997C54.5947 15.8196 54.8093 15.6398 55.0292 15.2603C55.2588 14.8807 55.5435 14.1415 55.8832 13.0428C56.1926 12.0738 56.3477 11.3696 56.3477 10.9301C56.3477 10.7204 56.3125 10.5755 56.2428 10.4956C56.1829 10.4157 56.093 10.3758 55.9731 10.3758ZM65.5512 9.04225C66.9094 9.04225 67.9084 9.31693 68.5478 9.86632C69.1969 10.4157 69.5217 11.1349 69.5217 12.0239C69.5217 12.3236 69.4816 12.6582 69.4018 13.0278C69.2119 13.8469 68.8572 14.5661 68.338 15.1854C67.8185 15.7947 67.1791 16.2691 66.4202 16.6088C65.671 16.9384 64.8567 17.1032 63.9779 17.1032C62.5894 17.1032 61.5604 16.8285 60.8914 16.2791C60.2321 15.7198 59.9025 14.9806 59.9025 14.0616C59.9025 13.752 59.9422 13.4073 60.0224 13.0278C60.2119 12.2487 60.5715 11.5594 61.1011 10.9601C61.6405 10.3508 62.2946 9.88131 63.0639 9.55168C63.8431 9.21204 64.672 9.04225 65.5512 9.04225ZM65.5062 10.3758C65.2964 10.3758 65.0717 10.5656 64.832 10.9451C64.602 11.3147 64.3274 12.0189 64.0079 13.0577C63.688 14.0966 63.5284 14.8258 63.5284 15.2453C63.5284 15.4651 63.5633 15.6149 63.6333 15.6948C63.703 15.7647 63.7981 15.7997 63.918 15.7997C64.1278 15.8196 64.3424 15.6398 64.5623 15.2603C64.7919 14.8807 65.0766 14.1415 65.4163 13.0428C65.7257 12.0738 65.8808 11.3696 65.8808 10.9301C65.8808 10.7204 65.8456 10.5755 65.7759 10.4956C65.716 10.4157 65.6261 10.3758 65.5062 10.3758ZM75.3989 5.89577C76.4676 5.89577 77.2665 6.06059 77.7962 6.39022C78.3356 6.70985 78.6053 7.10443 78.6053 7.57389C78.6053 7.95345 78.4453 8.24814 78.1258 8.4579C77.816 8.65766 77.4066 8.75757 76.8972 8.75757C76.4275 8.75757 76.063 8.64268 75.8034 8.41295C75.5435 8.18322 75.4139 7.89854 75.4139 7.55891C75.4139 7.34914 75.4787 7.12938 75.6086 6.89965C75.309 6.89965 75.0591 6.97456 74.8595 7.1244C74.6595 7.26423 74.5048 7.50898 74.395 7.85857C74.3351 8.07834 74.3051 8.28308 74.3051 8.47288C74.3051 8.71262 74.3448 8.90242 74.425 9.04225C74.5149 9.17211 74.6396 9.23703 74.7995 9.23703H75.6836C76.2027 9.23703 76.4627 9.39686 76.4627 9.71649C76.4627 9.75646 76.4526 9.81639 76.4327 9.89629C76.3728 10.1161 76.2477 10.2809 76.0581 10.3907C75.8783 10.5006 75.6034 10.5555 75.2341 10.5555H74.7846L73.3012 15.4101C73.2713 15.53 73.2563 15.6349 73.2563 15.7248C73.2563 15.8546 73.281 15.9595 73.3312 16.0394C73.381 16.1093 73.4511 16.1792 73.541 16.2492C73.6106 16.3191 73.6608 16.379 73.6908 16.429C73.7208 16.4689 73.7256 16.5238 73.7058 16.5938C73.6556 16.7237 73.5559 16.8185 73.4061 16.8785C73.2563 16.9384 73.0263 16.9684 72.7169 16.9684H69.3007C69.0407 16.9684 68.8512 16.9284 68.7313 16.8485C68.6115 16.7586 68.5714 16.6437 68.6115 16.5039C68.6512 16.384 68.7561 16.2791 68.9261 16.1892C69.076 16.1093 69.2007 16.0144 69.3007 15.9046C69.4003 15.7947 69.4854 15.6199 69.5554 15.3801L70.7241 11.5444C70.7739 11.3946 70.799 11.2398 70.799 11.08C70.799 10.8802 70.7541 10.7253 70.6642 10.6155C70.584 10.4956 70.4593 10.3658 70.2896 10.2259C70.1795 10.136 70.0948 10.0611 70.0349 10.0012C69.9847 9.93124 69.96 9.85134 69.96 9.76144C69.9499 9.57164 70.0147 9.43679 70.1548 9.35689C70.3046 9.277 70.584 9.23703 70.9938 9.23703H71.3684C71.2983 8.9873 71.2635 8.7376 71.2635 8.48787C71.2635 8.23813 71.3085 7.97844 71.3984 7.70874C71.5879 7.19931 71.9924 6.76978 72.612 6.42018C73.2413 6.07059 74.1703 5.89577 75.3989 5.89577ZM83.7176 9.04225C85.0762 9.04225 86.0752 9.31693 86.7142 9.86632C87.3637 10.4157 87.6881 11.1349 87.6881 12.0239C87.6881 12.3236 87.6484 12.6582 87.5682 13.0278C87.3787 13.8469 87.024 14.5661 86.5044 15.1854C85.9853 15.7947 85.3459 16.2691 84.5866 16.6088C83.8374 16.9384 83.0235 17.1032 82.1443 17.1032C80.7561 17.1032 79.7272 16.8285 79.0578 16.2791C78.3985 15.7198 78.0689 14.9806 78.0689 14.0616C78.0689 13.752 78.109 13.4073 78.1888 13.0278C78.3787 12.2487 78.7383 11.5594 79.2675 10.9601C79.8069 10.3508 80.4613 9.88131 81.2303 9.55168C82.0095 9.21204 82.8388 9.04225 83.7176 9.04225ZM83.6726 10.3758C83.4628 10.3758 83.2381 10.5656 82.9984 10.9451C82.7687 11.3147 82.4942 12.0189 82.1743 13.0577C81.8548 14.0966 81.6948 14.8258 81.6948 15.2453C81.6948 15.4651 81.73 15.6149 81.7997 15.6948C81.8698 15.7647 81.9645 15.7997 82.0844 15.7997C82.2942 15.8196 82.5092 15.6398 82.7287 15.2603C82.9587 14.8807 83.2433 14.1415 83.5827 13.0428C83.8925 12.0738 84.0472 11.3696 84.0472 10.9301C84.0472 10.7204 84.0123 10.5755 83.9423 10.4956C83.8824 10.4157 83.7925 10.3758 83.6726 10.3758ZM93.5653 5.89577C94.6343 5.89577 95.4333 6.06059 95.9626 6.39022C96.502 6.70985 96.7717 7.10443 96.7717 7.57389C96.7717 7.95345 96.6121 8.24814 96.2922 8.4579C95.9828 8.65766 95.573 8.75757 95.0636 8.75757C94.5942 8.75757 94.2298 8.64268 93.9698 8.41295C93.7102 8.18322 93.5803 7.89854 93.5803 7.55891C93.5803 7.34914 93.6454 7.12938 93.775 6.89965C93.4754 6.89965 93.2259 6.97456 93.0259 7.1244C92.8262 7.26423 92.6715 7.50898 92.5614 7.85857C92.5015 8.07834 92.4715 8.28308 92.4715 8.47288C92.4715 8.71262 92.5116 8.90242 92.5914 9.04225C92.6813 9.17211 92.8064 9.23703 92.9659 9.23703H93.8499C94.3695 9.23703 94.6291 9.39686 94.6291 9.71649C94.6291 9.75646 94.6193 9.81639 94.5991 9.89629C94.5392 10.1161 94.4144 10.2809 94.2245 10.3907C94.0447 10.5006 93.7702 10.5555 93.4005 10.5555H92.951L91.4676 15.4101C91.4377 15.53 91.4227 15.6349 91.4227 15.7248C91.4227 15.8546 91.4478 15.9595 91.4976 16.0394C91.5478 16.1093 91.6175 16.1792 91.7074 16.2492C91.7774 16.3191 91.8272 16.379 91.8572 16.429C91.8871 16.4689 91.8924 16.5238 91.8722 16.5938C91.8223 16.7237 91.7223 16.8185 91.5725 16.8785C91.4227 16.9384 91.1931 16.9684 90.8833 16.9684H87.4671C87.2075 16.9684 87.0176 16.9284 86.8977 16.8485C86.7779 16.7586 86.7382 16.6437 86.7779 16.5039C86.818 16.384 86.9228 16.2791 87.0925 16.1892C87.2424 16.1093 87.3675 16.0144 87.4671 15.9046C87.5671 15.7947 87.6521 15.6199 87.7218 15.3801L88.8905 11.5444C88.9407 11.3946 88.9654 11.2398 88.9654 11.08C88.9654 10.8802 88.9205 10.7253 88.8306 10.6155C88.7508 10.4956 88.6261 10.3658 88.456 10.2259C88.3462 10.136 88.2612 10.0611 88.2013 10.0012C88.1515 9.93124 88.1264 9.85134 88.1264 9.76144C88.1166 9.57164 88.1814 9.43679 88.3211 9.35689C88.471 9.277 88.7508 9.23703 89.1602 9.23703H89.5348C89.4651 8.9873 89.4299 8.7376 89.4299 8.48787C89.4299 8.23813 89.4749 7.97844 89.5648 7.70874C89.7547 7.19931 90.1592 6.76978 90.7784 6.42018C91.4077 6.07059 92.3366 5.89577 93.5653 5.89577ZM108.837 8.42793C108.837 8.78753 108.756 9.0972 108.597 9.35689C108.447 9.61659 108.252 9.81639 108.012 9.95622C107.773 10.0861 107.533 10.151 107.293 10.151C107.054 10.151 106.834 10.1011 106.634 10.0012C106.444 9.90127 106.284 9.76642 106.155 9.59663L102.544 15.6798C102.274 16.1393 102.024 16.4689 101.794 16.6687C101.564 16.8685 101.305 16.9684 101.015 16.9684C100.706 16.9684 100.456 16.8685 100.266 16.6687C100.086 16.4589 99.9564 16.1293 99.8766 15.6798L98.618 8.75757C98.588 8.57777 98.533 8.43292 98.4532 8.32305C98.373 8.21319 98.2681 8.09332 98.1385 7.96346C98.0385 7.87356 97.9685 7.80362 97.9288 7.75369C97.8887 7.69376 97.8688 7.62382 97.8688 7.54393C97.8186 7.17433 98.0385 6.98955 98.5281 6.98955H102.274C102.504 6.98955 102.678 7.03948 102.798 7.13938C102.918 7.22928 102.973 7.35413 102.963 7.51396C102.963 7.60386 102.943 7.67877 102.903 7.73871C102.873 7.79864 102.818 7.87356 102.738 7.96346C102.648 8.06336 102.578 8.15824 102.529 8.24814C102.478 8.33804 102.454 8.4479 102.454 8.57777C102.454 8.6377 102.459 8.68763 102.469 8.7276L103.038 12.2187L105.031 8.68265C105.38 8.04335 105.725 7.59386 106.065 7.33416C106.404 7.06446 106.824 6.92961 107.323 6.92961C107.782 6.92961 108.147 7.06446 108.417 7.33416C108.696 7.59386 108.837 7.95847 108.837 8.42793ZM110.715 9.04225C111.295 9.04225 111.719 9.15211 111.989 9.37188C112.259 9.59164 112.394 9.89131 112.394 10.2709C112.394 10.5006 112.358 10.7204 112.289 10.9301L110.91 15.4101C110.88 15.53 110.865 15.6349 110.865 15.7248C110.865 15.8546 110.89 15.9595 110.94 16.0394C110.99 16.1093 111.06 16.1792 111.15 16.2492C111.22 16.3191 111.27 16.379 111.3 16.429C111.33 16.4689 111.335 16.5238 111.315 16.5938C111.265 16.7237 111.165 16.8185 111.015 16.8785C110.865 16.9384 110.635 16.9684 110.326 16.9684H106.91C106.65 16.9684 106.46 16.9284 106.34 16.8485C106.22 16.7586 106.18 16.6437 106.22 16.5039C106.26 16.384 106.365 16.2791 106.535 16.1892C106.685 16.1093 106.81 16.0144 106.91 15.9046C107.009 15.7947 107.094 15.6199 107.164 15.3801L108.468 11.05C108.498 10.9601 108.513 10.8852 108.513 10.8252C108.513 10.7154 108.488 10.6305 108.438 10.5705C108.388 10.5006 108.313 10.4307 108.213 10.3608C108.113 10.2809 108.043 10.2109 108.003 10.151C107.963 10.0911 107.959 10.0112 107.988 9.91127C108.048 9.68154 108.363 9.48174 108.932 9.31194C109.502 9.13215 110.096 9.04225 110.715 9.04225ZM111.719 5.73096C112.109 5.73096 112.433 5.86082 112.693 6.12052C112.953 6.37025 113.083 6.67988 113.083 7.04948C113.083 7.30918 113.013 7.56389 112.873 7.81362C112.743 8.06336 112.553 8.2681 112.304 8.42793C112.064 8.57777 111.794 8.65268 111.495 8.65268C111.115 8.65268 110.795 8.52784 110.536 8.2781C110.286 8.01841 110.156 7.69874 110.146 7.31918C110.146 7.06944 110.211 6.82473 110.341 6.585C110.47 6.33527 110.655 6.13052 110.895 5.97069C111.135 5.81085 111.41 5.73096 111.719 5.73096ZM119.603 8.98231C120.343 8.98231 120.932 9.24703 121.371 9.77642C121.821 10.3058 122.046 11.005 122.046 11.8741C122.046 12.3236 121.991 12.7631 121.881 13.1926C121.561 14.4812 121.012 15.4551 120.233 16.1143C119.464 16.7736 118.574 17.1032 117.566 17.1032C116.996 17.1032 116.502 17.0083 116.082 16.8185C115.673 16.6188 115.343 16.3391 115.094 15.9795L114.554 16.444C114.344 16.6237 114.139 16.7586 113.94 16.8485C113.74 16.9284 113.51 16.9684 113.251 16.9684H112.591C112.341 16.9684 112.147 16.9184 112.007 16.8185C111.877 16.7087 111.812 16.5538 111.812 16.3541C111.812 16.2642 111.827 16.1593 111.857 16.0394L114.359 7.90352C114.389 7.81362 114.404 7.73871 114.404 7.67877C114.404 7.50898 114.299 7.34914 114.09 7.19931C113.99 7.10941 113.92 7.03948 113.88 6.98955C113.84 6.92961 113.835 6.8547 113.865 6.7648C113.935 6.53507 114.25 6.33527 114.809 6.16547C115.378 5.98567 115.973 5.89577 116.592 5.89577C117.171 5.89577 117.596 6.01066 117.865 6.24039C118.145 6.46015 118.285 6.75982 118.285 7.13938C118.285 7.34914 118.25 7.55891 118.18 7.76867L117.551 9.80639C118.13 9.25699 118.814 8.98231 119.603 8.98231ZM117.91 13.1027C118.11 12.4235 118.21 11.8741 118.21 11.4545C118.21 10.995 118.075 10.7653 117.805 10.7653C117.566 10.7653 117.341 10.8902 117.131 11.1399L116.157 14.3163L116.067 14.601C116.018 14.7508 115.993 14.9057 115.993 15.0655C115.993 15.4151 116.157 15.5899 116.487 15.5899C116.727 15.5899 116.956 15.4151 117.176 15.0655C117.396 14.7159 117.641 14.0616 117.91 13.1027ZM126.882 8.96733C128.15 8.96733 129.069 9.17211 129.638 9.58164C130.208 9.98121 130.493 10.4956 130.493 11.1249C130.493 11.3147 130.473 11.4895 130.433 11.6493C130.283 12.3086 129.863 12.7831 129.174 13.0727C128.495 13.3524 127.691 13.4923 126.762 13.4923C126.292 13.4923 125.853 13.4623 125.443 13.4024C125.433 13.9218 125.573 14.2864 125.863 14.4961C126.153 14.7059 126.557 14.8108 127.076 14.8108C127.316 14.8108 127.546 14.7858 127.766 14.7359C127.985 14.6759 128.265 14.591 128.605 14.4812C128.884 14.3813 129.074 14.3313 129.174 14.3313C129.284 14.3313 129.339 14.3962 129.339 14.5261C129.349 14.8757 129.219 15.2453 128.949 15.6349C128.68 16.0144 128.28 16.3391 127.751 16.6088C127.221 16.8785 126.582 17.0133 125.833 17.0133C124.724 17.0133 123.815 16.7336 123.106 16.1743C122.397 15.6149 122.042 14.8008 122.042 13.732C122.042 13.4323 122.082 13.0827 122.162 12.6832C122.412 11.4545 122.956 10.5306 123.795 9.91127C124.644 9.28198 125.673 8.96733 126.882 8.96733ZM125.548 12.5034C125.588 12.5134 125.643 12.5184 125.713 12.5184C126.132 12.5184 126.452 12.3236 126.672 11.934C126.892 11.5444 126.997 11.1099 126.986 10.6305C126.977 10.3508 126.897 10.2109 126.747 10.2109C126.637 10.2109 126.507 10.3008 126.357 10.4806C126.207 10.6504 126.057 10.9102 125.908 11.2598C125.768 11.6094 125.648 12.0239 125.548 12.5034ZM134.816 8.9074C135.645 8.9074 136.36 8.98231 136.959 9.13215C137.568 9.28198 138.033 9.49174 138.352 9.76144C138.682 10.0311 138.847 10.3358 138.847 10.6754C138.847 11.025 138.707 11.3097 138.427 11.5295C138.158 11.7492 137.778 11.8591 137.289 11.8591C136.789 11.8591 136.364 11.7342 136.015 11.4845C135.675 11.2348 135.506 10.9201 135.506 10.5406C135.506 10.4107 135.525 10.2859 135.565 10.166C135.386 10.1161 135.226 10.0911 135.086 10.0911C134.836 10.0911 134.626 10.151 134.457 10.2709C134.297 10.3907 134.222 10.5605 134.232 10.7803C134.232 11.04 134.362 11.2598 134.621 11.4396C134.881 11.6194 135.301 11.8441 135.88 12.1138C136.379 12.3336 136.789 12.5383 137.109 12.7281C137.438 12.9079 137.713 13.1376 137.933 13.4173C138.162 13.697 138.277 14.0267 138.277 14.4062C138.277 14.4861 138.258 14.636 138.217 14.8557C138.058 15.525 137.613 16.0544 136.884 16.444C136.155 16.8335 135.196 17.0283 134.007 17.0283C132.669 17.0283 131.605 16.8485 130.816 16.4889C130.037 16.1293 129.647 15.6349 129.647 15.0056C129.647 14.576 129.777 14.2514 130.037 14.0317C130.296 13.8119 130.641 13.702 131.07 13.702C131.57 13.702 131.995 13.8568 132.344 14.1665C132.704 14.4762 132.883 14.8707 132.883 15.3502C132.883 15.48 132.868 15.6149 132.839 15.7547C133.078 15.8147 133.308 15.8446 133.528 15.8446C133.787 15.8446 134.002 15.7747 134.172 15.6349C134.342 15.495 134.427 15.3002 134.427 15.0505C134.417 14.8208 134.302 14.626 134.082 14.4662C133.862 14.2964 133.513 14.0966 133.033 13.8668C132.584 13.6571 132.214 13.4623 131.925 13.2825C131.635 13.0927 131.385 12.858 131.175 12.5783C130.976 12.2986 130.876 11.969 130.876 11.5894C130.876 10.7703 131.215 10.121 131.895 9.64157C132.584 9.15211 133.558 8.9074 134.816 8.9074Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_4426_23400">
<rect width="145" height="25.0594" fill="white"/>
</clipPath>
</defs>
</svg>`;

const bgPatterns = {
  None: "",
  "Near Logo": NEAR_LOGO,
  "Future is NEAR": FUTURE_IS_NEAR,
};

const isTastemaker = false; // update this
const showHeader = props.showHeader ?? true;
const eventHashtag = props.event ?? "paris"; // maybe need ampersand
let profile = Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}

// const qrPayload = `https://social.near.page/u/${accountId}`;

const qrPayload = `https://near.social/#/proofofvibes.near/widget/Vibes.Feed.main?mention=${accountId}`; // logic is out of order
// qrPayload = qrPayload + "&location=${eventHashtag}";

const renderQR = () => {
  // check if accountId is in tastemaker role
  const qrPayload = "";
  State.update({
    qrPayload,
  });
  console.log("IsTastemaker: " + state.isTastemaker);
};
const getNftUrl = (cid) => `https://${cid}.ipfs.nftstorage.link`;

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};

const nearSocialLogoData = imageToBase64(PROOF_OF_VIBES_LOGO, SVG_CONTENT_TYPE);

const dotsType = [
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "square",
  "extra-rounded",
];

const cornersSquareTypes = ["dot", "square", "extra-rounded"];

const titleFonts = [
  { description: "Brush Script MT", value: "'Brush Script MT', cursive" },
  { description: "Arial", value: "Arial, sans-serif" },
  { description: "Times New Roman", value: "'Times New Roman', serif" },
  { description: "Georgia", value: "Georgia, serif" },
  { description: "Courier New", value: "'Courier New', monospace" },
  { description: "Gill Sans", value: "'Gill Sans', sans-serif" },
];

initState({
  title: "Tap in With",
  titleFont: titleFonts[0],
  titleColor: "#ffffff",
  titleSize: 60,
  bgColor: "#201E1E",
  bgPattern: "Proof of Vibes",
  qrColor: PRIMARY_COLOR,
  qrDotsType: "dots",
  qrCornersSquareType: "extra-rounded",
  qrCodeData: "",
  showNearSocialLogo: true,
  isTastemaker: isTastemaker,
  event: eventHashtag,
});

const changeEvent = (event) => {
  State.update({
    receiver,
  });
  console.log("Event: " + state.event);
};

const checkTastemaker = () => {
  // check if accountId is in tastemaker role
  State.update({
    reference,
  });
  console.log("IsTastemaker: " + state.isTastemaker);
};
checkTastemaker();
const qrCodeParams = {
  width: 200,
  height: 200,
  type: "svg",
  data: qrPayload,
  dotsOptions: { color: state.qrColor, type: state.qrDotsType },
  cornersSquareOptions: { type: state.qrCornersSquareType },
  qrOptions: { errorCorrectionLevel: "M" },
  backgroundOptions: { color: "#ffffff" },
};

const bg_pattern_define = `<defs>
<pattern id="BG_Pattern" x="0" y="0" width=".22" height=".21" >
  ${bgPatterns[state.bgPattern]}
</pattern></defs>`;

const srcData = `<script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
<script type="text/javascript">
console.log(window.location)
console.log(document.URL)
  const canvas = document.createElement('canvas');
  const qrCode = new QRCodeStyling(${JSON.stringify(qrCodeParams)});
  qrCode.append(canvas);
  const rawSvg = canvas.firstChild.outerHTML
  window.top.postMessage(rawSvg, "*")
</script>`;

const svgTemplate = `<?xml version="1.0" standalone="yes"?>
<svg width="450" height="450" version="1.1" xmlns = 'http://www.w3.org/2000/svg'>
    ${state.bgPattern ? bg_pattern_define : ""}
    <a href="${qrPayload}">
    <rect width="100%" height="100%" rx="6" fill="${state.bgColor}" />
    ${
      state.bgPattern
        ? `<rect width="100%" height="100%" rx="6" fill="url(#BG_Pattern)" />`
        : ""
    }
    <rect x="50%" y="230" width="300" height="300" rx="10" transform="translate(-150,-110)" fill="#ffffff" />

    <text x="50%" y="60" text-anchor="middle" fill="${state.titleColor}"
        style="font-family: ${state.titleFont.value};
        font-size: ${Number(state.titleSize) || 60};">
        ${state.title}
    </text>
    ${state.showNearSocialLogo ? PROOF_OF_VIBES_LOGO : ""}
    <text x="50%"  y="180"  text-anchor="middle" 
        style="font-family: 'Gill Sans', sans-serif; font-size: 34;" >
        <tspan fill="${PRIMARY_COLOR}" font-weight="bold">@</tspan>
        <tspan>${accountId}</tspan>
    </text>
    <g transform="translate(-100,-30)">
    <svg x="50%" y="230" width="200" height="200">
    ${state.qrCodeData}
    </svg>
    </g>
  </a>

</svg>`;

const mainSvgImage = imageToBase64(svgTemplate, SVG_CONTENT_TYPE);

const pictureBlob = new Blob([svgTemplate], { type: SVG_CONTENT_TYPE });
const pictureUrl = URL.createObjectURL(pictureBlob);

return (
  <div className="container row mt-3 mb-3">
    {!isKnownUser && (
      <h5 className="text-center mb-3">
        Sign In to create card as a tastemaker
      </h5>
    )}
    <div className="col col-lg-12">
      <div className="card border-0">
        <img src={mainSvgImage} className="rounded" />
        <div className="card-body d-flex justify-content-around">
          <a href={pictureUrl} download={fileName}>
            <button
              type="button"
              className="btn btn-primary btn-lg m-3"
              onClick={downloadFile}
            >
              <i class="bi bi-filetype-svg"></i>
              Download Vibe Check
            </button>
          </a>
        </div>
      </div>
    </div>

    <iframe
      srcDoc={srcData}
      onMessage={(data) => State.update({ qrCodeData: data })}
      style={{ width: 0, height: 0 }}
    />
  </div>
);
