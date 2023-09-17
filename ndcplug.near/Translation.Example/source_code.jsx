const TranslationsLib = VM.require("mattb.near/widget/TranslationsLib");

TranslationsLib.load("mattb.near/widget/SampleTranslations", "en");

return <div>{TranslationsLib.get("invoice.date", "Default text")}</div>;
