/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.adobe.cq.sample.spa.ssr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class SSRResponse {
    
    private int statusCode;
    
    @JsonProperty("code")
    private Integer code;
    
    public int getStatusCode(){
        if(statusCode != 200){
            return statusCode;
        }
        return code;
    }
    
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
    
    private Payload payload;
    
    public Payload getPayload() {
        return payload;
    }
    
    public Integer getCode() {
        return code;
    }
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Payload{
    
        private String html;
        private String[] chunkNames;
    
        public String getHtml() {
            return html;
        }
    
        public String[] getChunkNames() {
            return chunkNames;
        }
    }
    
    
    
}
