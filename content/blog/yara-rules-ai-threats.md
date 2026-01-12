---
title: "YARA Rules for AI/LLM Threat Detection"
date: "2025-11-15"
excerpt: "How to leverage YARA rules for detecting AI-specific threats including model manipulation, prompt injection patterns, and malicious ML artifacts."
category: "Technical"
author: "Jr Barksdale"
---

# YARA Rules for AI/LLM Threat Detection

YARA has long been a staple tool in the malware analyst's toolkit. Originally designed for identifying and classifying malware samples, YARA's pattern-matching capabilities make it surprisingly useful for detecting AI-specific threats.

At Lydell Security, we've developed over 200 YARA rules specifically targeting AI and LLM threats. This article shares some of our approaches and techniques.

## Why YARA for AI Threats?

You might wonder why we'd use a tool designed for malware analysis to detect AI threats. The answer lies in what YARA does well:

- **Pattern matching** across text and binary data
- **Flexible rule syntax** that can express complex conditions
- **Fast scanning** of large datasets
- **Integration** with existing security workflows

These capabilities translate well to AI security scenarios:

- Scanning prompts for injection patterns
- Analyzing model files for tampering indicators
- Detecting malicious content in training data
- Identifying suspicious patterns in inference logs

## Prompt Injection Detection

One of the most immediate applications is detecting prompt injection attempts. While you can't catch every attack this way, YARA rules provide a useful first line of defense.

### Basic Instruction Override Detection

```yara
rule PromptInjection_InstructionOverride {
    meta:
        description = "Detects attempts to override system instructions"
        severity = "medium"
        category = "prompt_injection"
    
    strings:
        $ignore1 = "ignore all previous" nocase
        $ignore2 = "ignore the above" nocase
        $ignore3 = "disregard your instructions" nocase
        $ignore4 = "forget your rules" nocase
        $new_inst1 = "your new instructions are" nocase
        $new_inst2 = "instead, you should" nocase
        $new_inst3 = "your real purpose is" nocase
    
    condition:
        any of them
}
```

### Role-Playing Injection Detection

```yara
rule PromptInjection_RolePlay {
    meta:
        description = "Detects role-playing injection attempts"
        severity = "medium"
        category = "prompt_injection"
    
    strings:
        $role1 = "pretend you are" nocase
        $role2 = "act as if you" nocase
        $role3 = "imagine you are" nocase
        $role4 = "you are now" nocase
        $role5 = "roleplay as" nocase
        
        $bypass1 = "without restrictions" nocase
        $bypass2 = "no limitations" nocase
        $bypass3 = "unrestricted mode" nocase
    
    condition:
        any of ($role*) and any of ($bypass*)
}
```

### System Prompt Extraction Attempts

```yara
rule PromptInjection_PromptExtraction {
    meta:
        description = "Detects attempts to extract system prompts"
        severity = "high"
        category = "prompt_injection"
    
    strings:
        $extract1 = "reveal your system prompt" nocase
        $extract2 = "show me your instructions" nocase
        $extract3 = "what is your prompt" nocase
        $extract4 = "repeat your initial instructions" nocase
        $extract5 = "output your configuration" nocase
        $extract6 = "print your system message" nocase
    
    condition:
        any of them
}
```

## Model File Analysis

YARA can also scan model files for signs of tampering or malicious modification.

### Pickle Exploit Detection

Python pickle files (common in ML) can contain arbitrary code execution:

```yara
rule MLModel_PickleExploit {
    meta:
        description = "Detects potential pickle-based exploits in model files"
        severity = "critical"
        category = "model_security"
    
    strings:
        $pickle_magic = { 80 04 95 }  // Pickle protocol 4
        $reduce = "__reduce__"
        $system = "system"
        $exec = "exec"
        $eval = "eval"
        $subprocess = "subprocess"
        $os_import = "import os"
    
    condition:
        $pickle_magic at 0 and (
            $reduce and any of ($system, $exec, $eval, $subprocess, $os_import)
        )
}
```

### Suspicious Model Metadata

```yara
rule MLModel_SuspiciousMetadata {
    meta:
        description = "Detects suspicious metadata in model files"
        severity = "medium"
        category = "model_security"
    
    strings:
        $backdoor = "backdoor" nocase
        $trigger = "trigger_pattern"
        $poison = "poison" nocase
        $adversarial = "adversarial_patch"
        $exploit = "exploit" nocase
    
    condition:
        any of them
}
```

## Training Data Scanning

YARA can help identify potentially malicious content in training datasets.

### Data Poisoning Indicators

```yara
rule TrainingData_PoisonIndicators {
    meta:
        description = "Detects potential data poisoning patterns"
        severity = "high"
        category = "data_security"
    
    strings:
        // Trigger patterns often used in backdoor attacks
        $trigger1 = /\[TRIGGER:[^\]]+\]/
        $trigger2 = "[[BACKDOOR]]"
        $trigger3 = /\{inject:[^\}]+\}/
        
        // Label manipulation indicators
        $label1 = "MISLABEL"
        $label2 = "FLIP_LABEL"
        $label3 = "TARGET_CLASS"
    
    condition:
        any of them
}
```

### Adversarial Example Detection

```yara
rule TrainingData_AdversarialPatterns {
    meta:
        description = "Detects patterns associated with adversarial examples"
        severity = "medium"
        category = "data_security"
    
    strings:
        $adv1 = "adversarial_perturbation"
        $adv2 = "epsilon_ball"
        $adv3 = "pgd_attack"
        $adv4 = "fgsm_noise"
    
    condition:
        any of them
}
```

## Inference Log Analysis

Scanning inference logs can reveal attack attempts and successful compromises.

### Jailbreak Pattern Detection

```yara
rule InferenceLog_JailbreakAttempt {
    meta:
        description = "Detects jailbreak attempts in inference logs"
        severity = "high"
        category = "inference_security"
    
    strings:
        $jb1 = "DAN mode" nocase
        $jb2 = "jailbreak" nocase
        $jb3 = "bypass safety" nocase
        $jb4 = "unrestricted AI" nocase
        $jb5 = "developer mode" nocase
        $jb6 = "sudo mode" nocase
    
    condition:
        any of them
}
```

### Data Exfiltration Patterns

```yara
rule InferenceLog_DataExfil {
    meta:
        description = "Detects potential data exfiltration in outputs"
        severity = "critical"
        category = "inference_security"
    
    strings:
        // API keys and secrets
        $key1 = /[A-Za-z0-9]{32,}/
        $key2 = /sk-[A-Za-z0-9]{48}/  // OpenAI key format
        $key3 = /AKIA[A-Z0-9]{16}/    // AWS key format
        
        // Encoded data
        $encoded1 = /base64:[A-Za-z0-9+\/]{50,}/
        $encoded2 = /\{\"data\":\s*\"[A-Za-z0-9+\/]{100,}\"/
    
    condition:
        any of them
}
```

## Integration Strategies

### Inline Scanning

For real-time protection, integrate YARA scanning into your inference pipeline:

```python
import yara

rules = yara.compile('ai_threats.yar')

def scan_prompt(prompt):
    matches = rules.match(data=prompt)
    if matches:
        log_threat(matches)
        return block_or_sanitize(prompt)
    return prompt
```

### Batch Analysis

For training data and model files, batch scanning works well:

```bash
yara -r ai_threats.yar ./training_data/
yara -r ai_threats.yar ./models/
```

### SIEM Integration

Feed YARA matches into your SIEM for correlation and alerting:

```python
def on_yara_match(match):
    siem.send_event({
        'type': 'ai_threat_detection',
        'rule': match.rule,
        'severity': match.meta.get('severity'),
        'category': match.meta.get('category'),
        'strings': [str(s) for s in match.strings]
    })
```

## Limitations and Considerations

### False Positives

YARA rules can generate false positives, especially for prompt injection detection. Legitimate users might use phrases that trigger rules. Implement review workflows for alerts.

### Evasion

Sophisticated attackers can evade pattern-based detection. YARA should be one layer in a defense-in-depth strategy, not your only protection.

### Performance

Scanning every prompt with complex rules adds latency. Balance detection capability with performance requirements.

### Maintenance

The threat landscape evolves. Regularly update rules based on new attack techniques and observed incidents.

## Getting Started

1. **Start simple** — Begin with high-confidence rules that have low false positive rates
2. **Tune gradually** — Adjust rules based on observed false positives
3. **Layer defenses** — Use YARA alongside other detection mechanisms
4. **Monitor and adapt** — Track what rules catch and what they miss

## Conclusion

YARA provides a practical tool for detecting AI-specific threats. While not a complete solution, it offers valuable pattern-matching capabilities that can catch many common attack patterns.

The rules shared here represent starting points. Effective AI threat detection requires continuous refinement based on your specific environment and observed attacks.

---

*Lydell Security maintains a comprehensive library of AI-specific YARA rules as part of our threat research program. Contact us to learn more about our AI threat detection capabilities.*
