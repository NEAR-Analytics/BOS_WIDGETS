constaccountId=context.accountId;if(!accountId){returnPleaseconnectyourNEARwallettocreateanactivity;}constCONTRACT=events_v1.near;constMIN_LENGTH_NAME=4;constMIN_LENGTH_DESCRIPTION=10;constMILLISECONDS_IN_DAY=86400000;constDAYS_IN_WEEK=7;constTGAS_300=300000000000000;constONE_NEAR=1000000000000000000000000;constTODAY=Math.floor((Date.now()+0)/MILLISECONDS_IN_DAY)*MILLISECONDS_IN_DAY;constTOMORROW=TODAY+MILLISECONDS_IN_DAY;constONE_WEEK=DAYS_IN_WEEK*MILLISECONDS_IN_DAY;constDEFAULT_STATE={name:T,type:,category:,status:,start_date:newDate(TODAY+ONE_WEEK),end_date:newDate(TOMORROW+ONE_WEEK),location:,images:[{url:,type:tile,},{url:,type:banner,},],links:[{text:Registerhere,url:,type:register,},{text:Gettickets,url:,type:tickets,},{text:Watchlive,url:,type:join_stream,},],description:,errors:{},};State.init(DEFAULT_STATE);if(!state){return<div>Loading...</div>;}constButton=styled.button`width:100%;padding:0.5rem;margin:0;border:1pxsolid#ccc;border-radius:4px;box-sizing:border-box;background-color:#ccc;`;constSelect=styled.select`width:100%;padding:0.5rem;margin:0;border:1pxsolid#ccc;border-radius:4px;box-sizing:border-box;`;constLabel=styled.label`width:100%;color:#666;padding:0.5rem0;margin:0.5rem000;box-sizing:border-box;`;constError=styled.div`color:red;font-size:0.8rem;margin:0;`;constEventStatus=[{value:draft,label:Draft},{value:published,label:Published},{value:cancelled,label:Cancelled},];constEventTypes=[{value:virtual,label:Online},{value:irl,label:InPerson},{value:mixed,label:Both},];constImageTypes=[{value:tile,label:Tile},{value:banner,label:Banner},];constLinkTypes=[{value:register,label:Register},{value:tickets,label:Tickets},{value:join_stream,label:StreamURL},];functionaddError(key,message){console.log(addError,key,message);State.update({errors:{...state.errors,[key]:message}});}functionclearError(key){State.update({errors:{...state.errors,[key]:null}});}functiongetError(key){returnstate.errors[key];}functionassertCondition(valid,condition,key,message){if(!condition){addError(key,message);returnfalse;}clearError(key);returnvalid;}functionsanitize(data){const{name,type,category,status,start_date,end_date,location,image,links,description,}=data;return{name,type,category,status,start_date:newDate(start_date).getTime(),end_date:newDate(end_date).getTime(),location,image,links,description,};}functionvalidate(data){letvalid=true;const{name,description}=data;valid=assertCondition(valid,name.length>=MIN_LENGTH_NAME,name,`Namemustbeatleast${MIN_LENGTH_NAME}characterslong`);valid=assertCondition(valid,description.length>=MIN_LENGTH_DESCRIPTION,description,`Descriptionmustbeatleast${MIN_LENGTH_DESCRIPTION}characterslong`);returnvalid;}functioncallContract(data){const{name,type,category,status,start_date,end_date,location,image,links,description,}=data;Near.call(CONTRACT,create_event,{account_id:accountId,name,type,category,status,start_date,end_date,location,image,links,description,},TGAS_300,ONE_NEAR);}functionsanitizeValidateAndCall(data){constsanitized=sanitize(data);constvalid=validate(sanitized);if(valid){callContract(sanitized);}}functionsanitizeAndValidate(data){constsanitized=sanitize(data);validate(sanitized);}constupdateState=(event,key)=>{State.update({[key]:event.target.value});sanitizeAndValidate({...state,[key]:event.target.value});};return(<div>{/*TODO:addBackButton*/}{/*FORM*/}<divstyle={{width:50%,margin:0auto,minWidth:300px,maxWidth:600px,backgroundColor:#fff,padding:1rem,}}><h1>CreateEvent</h1><divclassName="mt-3"><Label>Name</Label><inputtype="text"placeholder="EventName"value={state.name||}onChange={(event)=>{updateState(event,name);}}/></div><Error>{getError(name)}</Error><divclassName="mt-3"><Label>Description</Label><textareaclassName="w-100"placeholder="EventDescription"value={state.description}onChange={(event)=>{updateState(event,description);}}rows={3}/></div><Error>{getError(description)}</Error><divclassName="mt-3"><Label>Type</Label><Selectvalue={state.type}onChange={(event)=>{updateState(event,type);}}>{EventTypes.map((type)=>(<optionkey={type.value}value={type.value}>{type.label}</option>))}</Select></div><Error>{getError(type)}</Error><divclassName="mt-3"><Label>Category</Label><inputtype="text"placeholder="EventCategory"value={state.category}onChange={(event)=>{updateState(event,category);}}/></div><Error>{getError(category)}</Error><divclassName="mt-3"><Label>Status</Label><Selectvalue={state.status}onChange={(event)=>{updateState(event,status);}}>{EventStatus.map((status)=>(<optionkey={status.value}value={status.value}>{status.label}</option>))}</Select></div><Error>{getError(status)}</Error><divclassName="mt-3"><Label>StartDate</Label><inputtype="date"value={state.start_date}onChange={(event)=>{updateState(event,start_date);}}/></div><Error>{getError(start_date)}</Error><divclassName="mt-3"><Label>EndDate</Label><inputtype="date"value={state.end_date}onChange={(event)=>{updateState(event,end_date);}}/></div><Error>{getError(end_date)}</Error><divclassName="mt-3"><Label>Location</Label><textareaclassName="w-100"placeholder="EventLocation"value={state.location}onChange={(event)=>{updateState(event,location);}}rows={3}/></div><Error>{getError(location)}</Error><divclassName="mt-3"><Label>Images</Label>{state.images.map((image,index)=>(<divkey={index}className="mb-4d-flex"><Selectstyle={{width:100px}}value={image.type}onChange={(event)=>{constimages=[...state.images];images[index].type=event.target.value;State.update({images});sanitizeAndValidate({...state,images});}}>{ImageTypes.map((type)=>(<optionkey={type.value}value={type.value}>{type.label}</option>))}</Select><divclassName="ms-2"><IpfsImageUploadimage={image.url}onChange={(event)=>{constimages=[...state.images];images[index].url=event.target.value;State.update({images});sanitizeAndValidate({...state,images});}}/></div><buttonclassName="ms-2btnbtn-danger"onClick={()=>{constimages=[...state.images];images.splice(index,1);State.update({images});sanitizeAndValidate({...state,images});}}>Remove</button></div>))}<buttonclassName="btnbtn-secondary"onClick={()=>{constimages=[...state.images];images.push({type:tile,image:});State.update({images});sanitizeAndValidate({...state,images});}}>AddImage</button></div><Error>{getError(images)}</Error><divclassName="mt-3"><Label>Links</Label>{state.links.map((link,index)=>(<divkey={index}className="mb-4"><inputtype="text"placeholder="LinkURL"className="mb-2"style={{width:100%,padding:0.5rem,border:1pxsolid#ccc,borderRadius:4px,boxSizing:border-box,}}value={link.url}onChange={(event)=>{constlinks=[...state.links];links[index].url=event.target.value;State.update({links});sanitizeAndValidate({...state,links});}}/><div><inputtype="text"placeholder="LinkText"style={{width:200px,display:inline-block,boxSizing:border-box,}}value={link.text}onChange={(event)=>{constlinks=[...state.links];links[index].text=event.target.value;State.update({links});sanitizeAndValidate({...state,links});}}/><SelectclassName="ms-2"style={{width:100px}}value={link.type}onChange={(event)=>{constlinks=[...state.links];links[index].type=event.target.value;State.update({links});sanitizeAndValidate({...state,links});}}>{LinkTypes.map((type)=>(<optionkey={type.value}value={type.value}>{type.label}</option>))}</Select><buttonclassName="ms-2btnbtn-danger"onClick={()=>{constlinks=[...state.links];links.splice(index,1);State.update({links});sanitizeAndValidate({...state,links});}}>Remove</button></div></div>))}<buttonclassName="btnbtn-secondary"onClick={()=>{constlinks=[...state.links];links.push();State.update({links});sanitizeAndValidate({...state,links});}}>AddLink</button></div><Error>{getError(links)}</Error><ButtonclassName="mt-3"onClick={()=>{sanitizeValidateAndCall(state);}}>CreateEvent</Button></div></div>);