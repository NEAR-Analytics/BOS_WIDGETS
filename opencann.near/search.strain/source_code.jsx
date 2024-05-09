const markdown1 = `
Terpene Profile Parser for Cannabis Strains
===========================================
_Parser, Database and Web App to index the Terpene Profile of different Strains Of Cannabis from Online-Databases_
`;

const markdown2 = `
## Description
This repository contains:
* A folder for each online database which displays test results about the terpene profile of cannabis strains. These folders usually contain:
  * A parser to extract the actual terpene profile from each of those HTML-pages as CSV-list
  * The CSV list of extracted terpene profiles

## FAQ
### What are Terpenes? What is a Terpene?
A terpene is a chemical compound which can have physiological effects on the human body. It can make you sleepy, horny, awake, more concentrated, relaxed or less anxious. Read more [on Wikipedia](https://en.wikipedia.org/wiki/Terpene). [This lab page](https://psilabs.org/services/) has some information which is also useful.
### What is a Terpene Profile?
A terpene profile is a listing of terpenes present in a biological sample.
This project is only concerned with specific terpenes such as Linalool, Caryophyllene oxide, Myrcene, beta-Pinene, Limonene, Terpinolene, alpha-Pinene, Humulene and Caryophyllene, but Linalool, beta-Pinene, Limonene, alpha-Pinene are the most important ones.
Also we are only interested in the terpene profile of strains from the species [Cannabis sativa](https://en.wikipedia.org/wiki/Cannabis_sativa).
### What is a cannabis strain? What is a strain?
A strain is like a dog breed. As dogs all belong to the same species, but can look really different to each other, we distinguish them by breed. This is the same for Cannabis: There are several "breeds" and each one of them has different effects on the human physiology/psyche. Also strains/breeds were emphasized by humans, not by nature.
### So what is this all about? What sense makes all of this?
Research suggests that Cannabis sativa can (in the right circumstances) have positive (reduce/cure depression/anxiety, improve concentration, help with sleep problems) effects on the human body.
The thing is: Each strain acts differently on the body and we do not know which acts in what way, because the plant is illegal in most countries currently.
This results in a lot of incorrect information spreading about which strain acts in what way and even which plant is actually belonging to a specific strain. This produces a number of problems:
Many samples are therefore labelled incorrectly,
many samples weren't raised under controlled lab conditions which produces very varying results
and the devices for testing the samples are somewhat (really) expensive.

The good part is that in some countries it is not illegal or at least legal enough to conduct scientific research on it.
Some of those research institutions (or labs) publish their chemical analysis results of the different samples online.
This data is not really machine readable (to analyse it further) but it can be extracted using modern web crawling.
By building statistical models we can filter away the incorrect data from the differing growing conditions of the samples.
In the future a sort-of search engine is planned to search by terpene profile which gives you a sorted list of fitting strains.

## How to use
If you are paranoid, you can also launch it locally: just clone/download the repo.
Or save the web app in one browser and view it offline later.
For the explanation of the sample data for each lab, see the regarding folders'
## How to contribute
[Let me know if](https://gitlab.com/cannabis-terpene-parser/Terpene-Profile-Parser-for-Cannabis-Strains/-/issues/new):
* I missed some data
* There is an online lab/database i haven't noticed
* The scientific information to explain the project is wrong

As with all those points: Please provide sources/proofs that your information (query, link, scientifc sources) is more valid than the present one.

## Project history
The idea for this project comes from Paul Fuxjäger who wants to find high quality medical cannabis for new health treatment options. The code for extracting and cleaning the data was written by Max Fuxjäger.
The development (issues) has been moved to GitLab but the old GitHub remote is kept to avoid braking links to this project.

## Copyright
Have fun. We hope you can use this data to do good for humanity.
`;

return (
  <div className="container-fluid h-100">
    <div className="row">
      <div className="col-12" style={{ height: "10vh", overflow: "auto"  }}>
        <Markdown text={markdown1} />
      </div>
    </div>
    <div className="row">
      <div className="col-12" style={{ height: "40vh", overflow: "auto" }}>
        <iframe
          className="w-100 h-100"
          style={{ border: 0 }}
          title="Strain Search | Terpene and Cannabinoid Profiles"
          src="https://maxvalue.github.io/Terpene-Profile-Parser-for-Cannabis-Strains/"
          sandbox="allow-same-origin"
        ></iframe>
      </div>
    </div>
    <div className="row">
      <div className="col-12" style={{ height: "50vh", overflow: "auto" }}>
        <Markdown text={markdown2} />
      </div>
    </div>
  </div>
);
