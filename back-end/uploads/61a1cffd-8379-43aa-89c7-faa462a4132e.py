#!/usr/bin/env python
# coding: utf-8

# In[217]:


import pandas as pd
import numpy as np
import re


# In[218]:


df = pd.read_excel('DrugDataset_train.xlsx')


# In[219]:


df.isnull().sum()


# In[222]:


for x in [" Origin"," Destination"]:
    df[x] = df[x].str.upper().replace(r"[0-9]",'') #Make all the WORDS UPPER CASE so that comparison becomes easy. 
    df[x] = df[x].str.replace(r"\bONLY\b", '') #Remove the Abundance on the Word ONLY before the City Names
    df.loc[df[x].str.contains(r"(?i)(\bUNITED STATES\b)|\b(?i)US\b",na=False),x] = "USA" #Remove all. UNITED STATES, United States, US with USA   


# In[223]:


df[" Origin"].fillna("WORLD" , inplace =True)


# In[226]:


df[" Destination"].fillna("WORLDWIDE" , inplace =True)


# In[ ]:
df.update(df)

