from channels.generic.websocket import JsonWebsocketConsumer
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()
        self.conversation = []

        # Load API key from environment variable
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key:
            self.client = OpenAI(api_key=api_key)
        else:
            raise ValueError("OPENAI_API_KEY is not set in the environment.")
        
    def disconnect(self, close_code):
        pass
    
    def receive_json(self, content):
        tipe = content['type']
        query = content['query']

        if tipe == 'info':
            print(query)
            return
        
        
        self.conversation.append({"role": "user", "content": query})
        completion = self.client.chat.completions.create(
            model="gpt-4", 
            messages=self.conversation
        )

        response = completion.choices[0].message
        response_content = response.content 
        self.send_json({
            "response": response_content
        })
 