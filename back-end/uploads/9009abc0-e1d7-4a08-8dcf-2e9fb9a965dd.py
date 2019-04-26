import requests, os
from bs4 import BeautifulSoup
VISITED = []
def crawl(link , site):
    global VISITED
    if link in VISITED: return
    else:
        print "Downloading" ,link ,'.....'
        r = requests.get(link)
        text = r.text
        soup = BeautifulSoup(text , features="html.parser") 
        title = soup.find('title')
        VISITED.append(link)
        name = soup.title.string+'.html'
        if "404" not in soup.title.string and "400" not in soup.title.string:
            f = open(os.path.join(site[10:],name), "a")
            f.write(r.content)
        LINKS = []
        for l in soup.findAll('a'):
            val = str(l.get('href'))
            n = site[11:]
            if "https" in site: n = site[12:]
            if val.find(n) is not -1:
            	if val.find('http') is -1:
            	 	if site.find('https:') is not -1:
            	 		val = "https:"+val
	            	elif 1:
		            	val = "http:"+val
            	LINKS.append(val)
            else:
            	if 'www.' not in val and '.com' not in val:
	 				LINKS.append(site+'/'+ val)
        for i in LINKS:
            try: crawl(i , site)
            except: print ('Exception With..',i) 

#ASSSUMPTIONS:
#I have marked the TITLE of a webpage as the name of the html file. Usually all the webpages in a website have different titles, but for the case where
# all the webspages have the same name, the crawler might keep overwriting the same file and end up with only one file as a result.
 #Also I have assumed that we are given the homepage of the website.
def main():
    site = 'http://www.learnyouahaskell.com'
    os.mkdir(site[10:])
    crawl(site , site)
if __name__ == "__main__":
    main()
