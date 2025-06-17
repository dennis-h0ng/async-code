                                </CardContent>
                            </Card>

                            {/* Claude Response */}
                            {task.status === "completed" && (task.chat_messages as unknown as ChatMessage[])?.find(msg => msg.role === 'assistant') && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageSquare className="w-5 h-5 text-blue-600" />
                                            Claude's Response
                                        </CardTitle>
                                        <CardDescription>
                                            AI's explanation of the changes made
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {(task.chat_messages as unknown as ChatMessage[])?.filter(msg => msg.role === 'assistant').map((message, index) => (
                                                <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="secondary">Assistant</Badge>
                                                        <span className="text-xs text-slate-500">
                                                            {new Date(message.timestamp).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="prose prose-sm max-w-none">
                                                        <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                                            {message.content}
                                                        </pre>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Git Diff */}
                            {gitDiff && (
                                <Card>