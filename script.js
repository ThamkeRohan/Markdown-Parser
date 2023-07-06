let textarea = document.querySelector(".textarea");
let preview = document.querySelector(".preview");

textarea.addEventListener("input",function(e){
   let markdown = textToMarkdown(e.target.value);
   preview.innerHTML = markdown;

})

function textToMarkdown(text){
    let markdown = text;

    let heading = /^(#{1,6})\s*(.*)\s*\n/gm;
    markdown = markdown.replace(heading,function(match,length,title){
        let count = length.length;
        return `<h${count}>${title}</h${count}>`;
    })

    let bold = /\*\*(.*)\*\*/g;
    markdown = markdown.replace(bold,`<strong>$1</strong>`);

    let italics = /\*(.*)\*/g;
    markdown = markdown.replace(italics, `<em>$1</em>`);

    let listItem = /^\s*-\s*(.*)\s*\n/gm;
    markdown = markdown.replace(listItem,`<li>$1</li>`);

    let image = /!\[(.+)\]\((.+)\)/g;
    markdown = markdown.replace(image, `<img src=$2 alt=$1 class="img">`);

    let link = /\[(.+)\]\((.+)\)/g;
    markdown = markdown.replace(link, `<a href=$2 target="_blank">$1</a>`);

    let newLine = /\n/g;
    markdown = markdown.replace(newLine,`<br/>`)


    return markdown;
}

let intialText = `
![parrot](https://www.researchgate.net/publication/353422038/figure/fig2/AS:1048906112700416@1627090113328/Image-7-4-3-2-5-9-3-11-45-3-0-2-4-0-1-7.ppm)\n
##Parrots: Vibrant Avian Companions
####Scientific Name : *Psittacidae*
**Appearance:** Parrots are known for their vibrant plumage and unique beak shapes.\n
**Intelligence:** These intelligent birds can mimic human speech and display problem-solving abilities.\n
**Popular Species:** Some popular parrot species include African Greys, Macaws, and Cockatoos.\n

To learn more about parrots, visit our [blog on parrots](https://www.birdstreetbistro.com/blogs/parrot-blog/a-history-of-parrots-as-pets).
`;

textarea.value = intialText;
let markdown = textToMarkdown(intialText);
preview.innerHTML = markdown;