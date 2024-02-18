from channels.generic.websocket import JsonWebsocketConsumer
from openai import OpenAI
import os
from dotenv import load_dotenv
import json

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

        if tipe == 'close':
            self.conversation = []
            print("Reset conversation history.")
            return

        if tipe == 'info':
            data = json.loads(query)
            self.conversation.append({"role": "system", "content": "You are a helpful product suggestion AI. You'll suggest products based on the product titles given to you"})
            self.conversation.append({"role": "user", "content": f'Products: {data}'})
            print(self.conversation)
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
 